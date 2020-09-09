const express = require("express");

const Product = require("../models/Product.js");
const User = require("../models/User.js");

// const middleware = require("../middleware");

const router = express.Router({mergeParams: true}); 

//Create 

router.post("/",  
	(req, res) =>
	{
        Product.findById(req.body.id,
			(err, product) =>
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					User.findById(req.body.id,
                        (err, product) =>
                        {
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                
                            }
                        }
                    )	
				}
			}
		)
	}
)

//Update 

router.put("/:review_id",
	(req, res) =>
	{
		Product.findById(req.body.id,
			(err, product) =>
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					User.findByIdAndUpdate(req.body.id,
                        (err, product) =>
                        {
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                
                            }
                        }
                    )	
				}
			}
		)
	}
)

//Destroy 

router.delete("/:review_id", 
	(req, res) =>
	{
		User.findById(req.params.id, 
			(err) =>
			{
				if(err)
				{
					console.log(err);
					res.redirect("back");
				}
				else
				{
					res.redirect("/products/" + req.params.id);
				}
			}
		)
	}
)

//Authorization function

// const isAuthorized = (req, res, next) =>
// {
// 	if(req.isAuthenticated())
// 	{
// 		review.findById(req.params.review_id,
// 			function(err, foundreview)
// 			{
// 				if(err)
// 				{
// 					res.redirect("back");
// 				}
// 				else
// 				{
// 					if(foundreview.author.id.equals(req.user.id))
// 					{
// 						return next();
// 					}
// 					else
// 					{
// 						res.redirect("back");
// 					}
// 				}
// 			}
// 		)
// 	}
// 	else
// 	{
// 		res.redirect("back");
// 	}
// }

module.exports = router;