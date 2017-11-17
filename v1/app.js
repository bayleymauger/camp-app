var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

var campgrounds = [
            {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=1353&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "Mountain Goats Rest", image: "https://images.unsplash.com/photo-1478810810369-07072c5ef88b?w=1350&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "Granite Hill", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?w=1350&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "Tenpine's Bluff", image: "https://images.unsplash.com/photo-1468869196565-78ea346a98ee?w=1350&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "Godric's Hollow", image: "https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?w=1502&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "Red Pine State", image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?w=1500&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
       ]

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
   res.render("campgrounds", {campgrounds: campgrounds}); 
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   res.redirect("/campgrounds"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});