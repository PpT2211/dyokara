// var mongoose = require("mongoose"),
// 
const        passport = require("passport"),
passportLocalMongoose = require("passport-local-mongoose"),
             mongoose = require("mongoose");

let UserSchema = new mongoose.Schema
(
    {
        username: String,
        password: String,
        isAdmin:
        {
            type: Boolean,
            default: false
        },
        cart:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
		wishlist:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ]
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
