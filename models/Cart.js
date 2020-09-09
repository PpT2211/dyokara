const mongoose = require("mongoose");

let CartSchema = new mongoose.Schema
    (
        {
            name: String,
			image: String,
            price: Number,
        }
    );

module.exports = mongoose.model("Cart", CartSchema);