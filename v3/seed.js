var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var campData = [
        {
            name: "Crusty Creek",
            image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?auto=format&fit=crop&w=1500&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description: "Scary creek at night"
        },
        {
            name: "Forest Floor",
            image: "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?auto=format&fit=crop&w=1498&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description: "Don't let the bed bugs bite!"
        },
        {
            name: "Lost Lake",
            image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?auto=format&fit=crop&w=1259&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description: "Unusual unique lake"
        }
    ]

var seedDB = function() {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed all campgrounds");
            campData.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                   if(err) {
                       console.log(err);
                   } else {
                       console.log("Added campground");
                       Comment.create({
                           text: "This campground sucks and I wish it had some internet",
                           author: "Joe Blogs"
                       }, function(err, comment) {
                           if(err) {
                               console.log(err);
                           } else {
                               campground.comments.push(comment);
                               campground.save();
                               console.log("Added comments");
                           }
                       });
                   }
                });
            });
        }
    })
}

module.exports = seedDB;