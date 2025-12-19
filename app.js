const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing");

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "partials/layout");

const MONGO_URL = "mongodb://127.0.0.1:27017/MAJPROJ";
mongoose.connect(MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
  res.send("Welcome to MAJPROJ");
});
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { listings: allListings });
});

app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

app.post("/listings", async (req, res) => {
  const { title, description, price, location, country, image } = req.body;

  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    image
  });

  await newListing.save();
  res.redirect("/listings");
});

app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country, image } = req.body;

  await Listing.findByIdAndUpdate(
    id,
    { title, description, price, location, country, image },
    { runValidators: true }
  );

  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

