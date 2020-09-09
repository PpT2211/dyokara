const express = require("express"),
     passport = require("passport");

const User = require("../models/User.js");

let Review = require("../models/Review.js");

let Product = require("../models/Product.js");

let Cart = require("../models/Cart.js");

const middleware = require("../middleware");

const router = express.Router();



//Home 

router.get("/",
    (req, res) => 
    {
        res.render("landing");
    }
)

//New 

router.get("/register",
    (req, res) => 
    {
        res.render("user/register");
    }
)

router.get("/newProduct",
    (req, res) =>
    {
        res.render("product/new.ejs");
    } 
)

//Create

router.post("/newProduct",
    (req, res) =>
    {
        Product.create({name: req.body.name, image: req.body.image,  price: req.body.price},
            (err,noErr) =>  
            {
                if(err){
                    res.send("Error");
                }else{
                    res.redirect("/newProduct");
                }
            }
            )
    }
)


//

router.get("/:id/checkout",function(req,res)
		   {
				Product.findById(req.params.id,function(err, found){
            		if(err){
               	 	alert("Error");
            		}
            		else{
                	res.render("user/checkout",{product: found});
            		}
        		})
			}
)

//Create 

router.post("/register",
    (req, res) =>
    {
        var newUser = new User({ username: req.body.username });

        User.register(newUser, req.body.password,
            (err, user) =>
            {
                if(err) 
                {
                    res.redirect("/register");
                }
                else 
                {
                    passport.authenticate("local")(req, res,
                        () =>
                        {
                            res.redirect("/products");
                        }
                    )
                }
            }
        )
    }
)

//Login

//Form 

router.get("/login",
    (req, res) =>
    {
        res.render("user/login");
    }
)

//Authenticate

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/products",
        failureRedirect: "/login"
    }
), (req, res) =>
   {}
)

//Logout

router.get("/logout",
    (req, res) =>
    {
        req.logout();
        res.redirect("/");
    }
)

//Cart

router.get("/:user/:id/cart", middleware.isLoggedIn,function(req,res){
	
	User.findById(req.params.user,function(err, user){
            		if(err){
               	 	res.send(err);
            		}
            		else{
                	Product.findById(req.params.id,function(err,product){
						if(err){
							res.send(err)
						}else{
						user.cart.push(product);
						user.save();
						res.redirect("/products/"+product._id)
						}
					})
					}
	})
})

router.delete("/:user/:id/cart/remove",function(req,res){
	User.findById(req.params.user,function(err,user){
		if(err){
			res.send("Error");
		}else{
			Product.findById(req.params.id,function(err,found){
				var index = user.cart.indexOf(found);
				user.cart.splice(index,1);
				user.save();
				res.redirect("/"+user._id+"/cart");	
			})
		}
	})
})

router.get("/:user/cart",function(req,res){
	User.findById(req.params.user).populate("cart").exec(function(err, user){
		if(err){
			res.send("Error");
		}else{
				res.render("user/cart",{user: user});	
			}	
		}
	)
})

router.get("/cartCheckout",function(req,res){
	Cart.find({},function(err, products){
		if(err){
			res.send("Error");
		}else{
			res.render("user/cartCheckout",{products: products});
		}
	})
})

//Wishlist

router.get("/:user/wishlist",function(req,res){
	User.findById(req.params.user).populate("wishlist").exec(function(err, user){
		if(err){
			res.send("Error");
		}else{
				res.render("user/wishlist",{user: user});	
			}	
		}
	)
})

router.get("/:user/:id/wishlist", middleware.isLoggedIn,function(req,res){
	
	User.findById(req.params.user,function(err, user){
            		if(err){
               	 	res.send(err);
            		}
            		else{
                	Product.findById(req.params.id,function(err,product){
						if(err){
							res.send(err)
						}else{
							if(user.wishlist.includes(product._id)){
								res.send("This item is already in wishlist");
							}else{
								user.wishlist.push(product);
								user.save();
								res.redirect("/products/"+product._id)	
							}
						}
					})
					}
	})
})

router.delete("/:user/:id/wishlist/remove",function(req,res){
	User.findById(req.params.user,function(err,user){
		if(err){
			res.send("Error");
		}else{
			Product.findById(req.params.id,function(err,found){
				var index = user.wishlist.indexOf(found);
				user.wishlist.splice(index,1);
				user.save();
				res.redirect("/"+user._id+"/wishlist");	
			})
		}
	})
})

//Reviews


router.get("/products/:id/reviews/new", middleware.isLoggedIn,
	(req, res) =>
	{
		//Find product
			Product.findById(req.params.id,function(err, product){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.render("review/new", {product: product});
				}
			}
		)	
	}
)

router.post("/products/:id/reviews", middleware.isLoggedIn,
	function(req, res)
	{
		//Find the product
		Product.findById(req.params.id,(err, product) =>
			{
				if(err)
				{
					console.log(err);
					res.redirect("back");
				}
				else
				{
					//Create the review
				Review.create(req.body.review,function(err,review){
						if(err){
							res.send(err)
						}else{
							product.reviews.push(review);
							product.save();
							res.redirect("/products/"+product._id);
							
						}
					})
				}
			}
		)
	}
)


//Catch all 



module.exports = router;