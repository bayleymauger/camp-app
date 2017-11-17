var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("./middleware");


router.post("/campgrounds/:id/comments", middlewareObj.isLoggedOut, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampr) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           var text = req.body.text;
           var author = {
               id: req.user._id,
               username: req.user.username
           }
           var newComment = {text: text, author: author}
           Comment.create(newComment, function(err, newComment) {
               if(err) {
                   console.log(err);
               } else {
                   newComment.author.id = req.user._id;
                   newComment.author.username = req.user.username;
                   newComment.save();
                   foundCampr.comments.push(newComment);
                   foundCampr.save();
                   res.redirect("/campgrounds/" + req.params.id);
               }
           });
       }
   });
});

router.get("/campgrounds/:id/comments/:commentID/edit", middlewareObj.isCommentYours, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            Comment.findById(req.params.commentID, function(err, foundComment) {
                if(err) {
                    console.log(err);
                } else {
                    res.render("comments/edit", {campground: foundCampground, comment: foundComment});
                }
            });
        }
    });
});

router.put("/campgrounds/:id/comments/:commentID", middlewareObj.isCommentYours, function(req, res) {
    var commentText = {
        text: req.body.comment
    }
   Comment.findByIdAndUpdate(req.params.commentID, commentText, function(err, foundComment) {
      if(err) {
          console.log(err);
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});

router.delete("/campgrounds/:id/comments/:commentID", middlewareObj.isCommentYours, function(req, res) {
   Comment.findByIdAndRemove(req.params.commentID, function(err, foundComment) {
      if(err) {
          console.log(err);
          res.redirect("/campgrounds/" + req.params.id);
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});

module.exports = router;