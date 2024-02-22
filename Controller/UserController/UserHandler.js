const express = require("express");
const UserService = require("../../service/User/UserService.js");
const AuthService = require("../../service/Auth/Auth.js");
const User = require("../../model/Users/user");
const socketIOSetup = require("../../socketio.js");

const GetUserByToken = async (req, res) => {
  try {
    console.log("Decoded User ID in Controller:", req.user._id);

    const user = await UserService.getUserById(req.user._id);
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

const CheckUserExist = async (req, res) => {
  try {
    const email = req.query.email;
    const isExist = await UserService.CheckUserExist(email);

    if (isExist) {
      res.status(200).json({ message: true });
    } else {
      res.status(200).json({ message: false });
    }
  } catch (error) {}
};

const CheckManagerExist = async (req, res) => {
  try {
    const role = req.query.role;
    const isExist = await UserService.CheckManagerExist(role);

    if (isExist) {
      res.status(200).json({ message: true });
    } else {
      res.status(200).json({ message: false });
    }
  } catch (error) {}
};
const GetUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const User = await AuthService.getUserByEmail(email);

    if (User) {
      res.status(200).json({ User });
    }
  } catch (error) {}
};

async function updateUser(req, res, next) {
  try {
    const { name, last_name } = req.body;
    const { email } = req.query;
    const newUser = new User(name, last_name);
    const io = socketIOSetup.getIO();

    await UserService.updateUser(newUser, email);
    io.emit("userUpdated", { event: "userUpdated", user: newUser });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.body;

    await UserService.deleteUser(id);

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function ActivateAccount(req, res) {
  try {
    const email = req.query.email;
    const activationResult = await AuthService.ActivateAccount(email);
    return res.status(200).json({
      message: "Account activated successfully",
      result: activationResult,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while activating the account" });
  }
}

async function GenNewCode(req, res) {
  try {
    const email = req.query.email;
    const newCode = await AuthService.GenNewCode(email);
    return res
      .status(200)
      .json({ message: "new code generated", result: newCode });
  } catch (error) {
    console.error(error);
  }
}

async function getUsersByRole(req, res) {
  try {
    const role = req.params.role;
    const Users = await UserService.getUsersByRole(role);

    if (Users) {
      res.status(200).json({ Users });
    }
  } catch (error) {}
}

module.exports = {
  GetUserByToken,
  GetAllUser,
  updateUser,
  deleteUser,
  CheckUserExist,
  GetUserByEmail,
  ActivateAccount,
  GenNewCode,
  CheckManagerExist,
  getUsersByRole
};
