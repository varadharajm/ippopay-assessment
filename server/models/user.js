const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  first_name: {
    type: String,
    required: [true, "First Name is required"],
  },
  last_name: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "User phone number required"],
    min: [12, "Too Few. Not valid number. Eg. +91-XXXXXXXXXX"],
    max: [12, "Too long. Not valid number. Eg. +91-XXXXXXXXXX"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email Already Exists"],
  },
  companyName: {
    type: String,
    required: [true, "Company Name is required"],
    unique: [true, "Company Name Already Exists"],
  },
  location: {
    type: String,
    required: [true, "Location can't be blank"],
  },
  link: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "description can't be blank"],
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("User", userSchema, "users");
