const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  filename: String,
  url: String,
});

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: imageSchema,
    default: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157",
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

