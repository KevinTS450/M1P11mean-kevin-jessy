const express = require("express");
const UserService = require("../../service/User/UserService.js");

const GetUserByToken = async (req, res) => {
  try {
    // Assuming there is a User model with findById method
    console.log("Decoded User ID in Controller:", req.user.id);

    const user = await UserService.getUserById(req.user.id);
    console.log("User Details:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const AllUser = await UserService.GetAllUsers();

    if (!AllUser) {
      return res.status(404).json({ message: "Users not found" });
    } else {
      return res.json({ AllUser });
    }
  } catch (error) {
    console.error(error);
  }
};

async function updateUser(req, res, next) {
  try {
    const { username, role, email, password, date_naissance, is_activate, age } =
      req.body;
    const newUser = new User(
      username,
      email,
      password,
      role,
      date_naissance,
      is_activate,
      age
    );

    await UserService.updateUser(newUser);

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.body;

    await UserService.deleteUser(id);

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}

module.exports = {
  GetUserByToken,
  GetAllUser,
};
