var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

var campgroundSchema = new Schema({
   name: String,
   image: String,
   description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Mountain Goats Rest", 
//     image: "https://images.unsplash.com/photo-1478810810369-07072c5ef88b?w=1350&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
    
// },  function(err, campground) {
//       if(err) {
//           console.log("There was an error");
//           console.log(err);
//       } else {
//           console.log("Added campground");
//           console.log(campground);
//       }
//     });

// var campgrounds = [
//             {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=1353&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "Mountain Goats Rest", image: "https://images.unsplash.com/photo-1478810810369-07072c5ef88b?w=1350&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "Granite Hill", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?w=1350&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "Tenpine's Bluff", image: "https://images.unsplash.com/photo-1468869196565-78ea346a98ee?w=1350&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "Godric's Hollow", image: "https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?w=1502&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "Red Pine State", image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?w=1500&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//       ]

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
    Campground.findById(req.params.id, function(err, foundCamp){
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