var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            alert(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

router.get("/campgrounds/new", isLoggedOut, function(req, res) {
    res.render("campgrounds/new");
});

router.post("/campgrounds", isLoggedOut, function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var user = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: description, user: user}
   Campground.create(newCampground, function(err, newCampground) {
       if(err) {
           res.redirect("/campgrounds/new");
           alert("There was an error adding campground");
       } else {
           res.redirect("/campgrounds"); 
       }
   });
});

router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

function isLoggedOut(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function isLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('back');
    }
}

module.exports = router;
