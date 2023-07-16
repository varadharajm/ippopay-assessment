const { v4: uuid4 } = require("uuid");
const { successMsg, failureMsg, printError } = require("../utils");

const User = require("../models/user");

//  Create new user with user data.
const addUser = async (req, res) => {
  if (!req.body.first_name) {
    res.send(failureMsg(res, "firstName is required"));
    return;
  }
  if (!req.body.email) {
    res.send(failureMsg(res, "email is required"));
    return;
  }
  if (!req.body.phone) {
    res.send(failureMsg(res, "phoneNo is required"));
    return;
  }
  const userWithEmail = await findUserByEmail(req.body.email);
  if (userWithEmail) {
    res.send(failureMsg(res, "user already exixts"));
    return;
  }

  try {
    const newUser = new User({
      id: uuid4(),
      phone: req.body.phone,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      companyName: req.body.companyName,
      location: req.body.location,
      link: req.body.link,
      description: req.body.description,
    });

    const user = await newUser.save();
    successMsg(res, user);
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

// Get user data by Id.
const getUser = async (req, res) => {
  const { id } = req.params || req.body;
  if (!id) {
    res.send(failureMsg(res, "id is required"));
    return;
  }
  try {
    const user = await User.findOne({ id: id.toLowerCase() });

    if (!user) {
      failureMsg(res, "No user Found");
      return;
    }
    successMsg(res, user);
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

// Get All user data from db.
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      failureMsg(res, "No Record Found");
      return;
    }
    successMsg(res, users);
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

// Update user by Id.
const updateUser = async (req, res) => {
  const { id } = req.params || req.body;
  if (!id) {
    res.send(failureMsg(res, "user id is required"));
    return;
  }
  const user = await User.findOne({ id: id.toLowerCase() });

  if (!user) {
    failureMsg(res, "No user Found");
    return;
  }

  try {
    const user = await User.findOneAndUpdate({ id: id }, req.body);
    successMsg(res, user);
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

// Remove user by Id.
const deletUser = async (req, res) => {
  const { id } = req.params || req.body;
  if (!id) {
    res.send(failureMsg(res, "user id is required"));
    return;
  }
  const user = await User.findOne({ id: id.toLowerCase() });

  if (!user) {
    failureMsg(res, "No user Found");
    return;
  }

  try {
    const user = await User.findOneAndRemove({ id: id });
    successMsg(res, user);
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

async function findUserByEmail(email) {
  try {
    return User.findOne({ email: email.toLowerCase() });
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deletUser,
};
