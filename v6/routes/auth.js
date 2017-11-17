var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", isLoggedIn, function(req, res) {
    res.render("landing");
});

router.get("/register", isLoggedIn, function(req, res) {
   res.render("register"); 
});

router.post("/register", isLoggedIn, function(req, res) {
   User.register(new User({username: req.body.username}), req.body.password, function(err, usr) {
      if(err) {
          console.log(err);
          return res.render("register");
      } else {
          passport.authenticate("local")(req, res, function() {
             res.redirect("/campgrounds");
          });
      }
   });
});

router.get("/logout", isLoggedOut, function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

router.get("/login", isLoggedIn, function(req, res) {
    res.render("login");
});

router.post("/login", isLoggedIn, passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/"
}), function(req, res) {
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