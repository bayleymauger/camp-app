var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var campData = [
        {
            name: "Crusty Creek",
            image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?auto=format&fit=crop&w=1500&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Forest Floor",
            image: "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?auto=format&fit=crop&w=1498&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Lost Lake",
            image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?auto=format&fit=crop&w=1259&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
     });
}

module.exports = seedDB;