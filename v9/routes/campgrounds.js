var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareObj = require("./middleware");

router.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            alert(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

router.get("/campgrounds/new", middlewareObj.isLoggedOut, function(req, res) {
    res.render("campgrounds/new");
});

router.post("/campgrounds", middlewareObj.isLoggedOut, function(req, res) {
   var user = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = req.body.campground;
   newCampground.user = user;
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
            var user = req.user;
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

router.get("/campgrounds/:id/edit", middlewareObj.checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds/" + req.params.id);
       } else {
           res.render("campgrounds/edit", {campground: foundCampground});
       }
    });
});

router.put("/campgrounds/:id", middlewareObj.checkCampgroundOwner, function(req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

router.delete("/campgrounds/:id", middlewareObj.checkCampgroundOwner, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err, foundCampground) {
      if(err) {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   }); 
});

module.exports = router;
