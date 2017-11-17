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
            var user = req.user;
            res.render("campgrounds/show", {campground: foundCamp, user: user});
        }
    });
});

router.get("/campgrounds/:id/edit", checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds/" + req.params.id);
       } else {
           res.render("campgrounds/edit", {campground: foundCampground});
       }
    });
});

router.put("/campgrounds/:id", checkCampgroundOwner, function(req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

router.delete("/campgrounds/:id", checkCampgroundOwner, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err, foundCampground) {
      if(err) {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
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

function checkCampgroundOwner(req, res, next) {
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

module.exports = router;
