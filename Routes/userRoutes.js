const express = require("express");
const {
  addUser,
  addManyUsers,
  getAllStudents,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
router.post("/add", addUser);
router.post("/addMany", addManyUsers);
router.get("/getAll", getAllStudents);
router.put("/update/:userId", updateUser);
router.delete("/delete", deleteUser)
module.exports = router;
