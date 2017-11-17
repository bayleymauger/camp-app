var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middlewareObj = require("./middleware");

router.get("/", middlewareObj.isLoggedIn, function(req, res) {
    res.render("landing");
});

router.get("/register", middlewareObj.isLoggedIn, function(req, res) {
   res.render("register"); 
});

router.post("/register", middlewareObj.isLoggedIn, function(req, res) {
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

router.get("/logout", middlewareObj.isLoggedOut, function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

router.get("/login", middlewareObj.isLoggedIn, function(req, res) {
    res.render("login");
});

router.post("/login", middlewareObj.isLoggedIn, passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/"
}), function(req, res) {
});



module.exports = router;