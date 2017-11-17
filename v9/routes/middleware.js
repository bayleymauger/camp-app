var Campground = require("../models/campground");
var Comment = require("../models/comment");
let middlewareObj = {}

middlewareObj.isLoggedOut = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('back');
    }
}

middlewareObj.checkCampgroundOwner = function (req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
           if(err) {
               console.log(err);
               res.redirect("back");
           } else {
               if(req.user._id.equals(foundCampground.user.id)) {
                   return next();
               } else {
                   res.redirect("/campgrounds/" + req.params.id);
                   console.log("You dont have permission to do that");
               }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isCommentYours = function (req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.commentID, function(err, foundComment) {
           if(err) {
               console.log(err);
               res.redirect("back");
           } else {
               if(req.user._id.equals(foundComment.author.id)) {
                   return next();
               } else {
                   res.redirect("/campgrounds/" + req.params.id);
                   console.log("You dont have permission to do that");
               }
           }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = middlewareObj;