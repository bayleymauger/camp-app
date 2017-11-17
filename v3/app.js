var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Models
var Comment = require("./models/comment");
var Campground = require("./models/campground");
var seedDB = require("./seed");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

seedDB();

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            alert(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newCampground = {name: name, image: image, description: description}
   Campground.create(newCampground, function(err, newCampground) {
       if(err) {
           res.redirect("/campgrounds/new");
           alert("There was an error adding campground");
       } else {
           res.redirect("/campgrounds"); 
       }
   });
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCamp});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});