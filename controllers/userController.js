const express = require("express");
const { app } = require("../app");
const { connectToDataBase } = require("../config/database");

const addUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const db = await connectToDataBase();
    const result = await db
      .collection("students")
      .insertOne({ firstName, lastName });
    res.status(200).json({ message: "user added successfully !", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addManyUsers = async (req, res) => {
  try {
    const users = req.body;
    const db = await connectToDataBase();
    const result = await db.collection("students").insertMany(users);
    res.status(200).json({ message: "users added successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const db = await connectToDataBase();
    const result = await db.collection("students").find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const { ObjectId } = require("mongodb");
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    const db = await connectToDataBase();
    const result = await db
      .collection("students")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { firstName, lastName } }
      );
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await connectToDataBase();
    const result = await db
      .collection("students")
      .deleteOne({ _id: new ObjectId(userId) });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  addManyUsers,
  getAllStudents,
  updateUser,
  deleteUser,
};
