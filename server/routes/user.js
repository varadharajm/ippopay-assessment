const express = require("express");
const router = express.Router();
const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deletUser,
} = require("../controllers/user");

router.post("/addUser", addUser);
router.get("/getUser/:id", getUser);
router.get("/getAllUsers", getAllUsers);
router.post("/updateUser/:id", updateUser);
router.delete("/deletUser/:id", deletUser);

module.exports = router;
