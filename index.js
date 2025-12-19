import mongoose from "mongoose";
import Listing from "../models/listing.js";
import data from "./data.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/MAJPROJ";
const sampleListings = data.data;

async function initDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected");

    await Listing.deleteMany({});
    console.log("Old listings removed");

    await Listing.insertMany(sampleListings);
    console.log("Sample listings inserted");

    await mongoose.connection.close();
    console.log("Database connection closed");

    console.log("Initialization complete");
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

initDB();
