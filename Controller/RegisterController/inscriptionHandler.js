const express = require("express");
const Inscription = require("../../service/Register/inscription.js");
const User = require("../../model/Users/user");
async function handleUserRegistration(req, res, next) {
  try {
    const {
      name,
      last_name,
      email,
      password,
      role,
      date_naissance,
      is_activate,
      age,
      validation_code,
      image,
    } = req.body;

    if (
      !name ||
      !last_name ||
      !email ||
      !password ||
      !role ||
      !date_naissance
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = new User(
      name,
      last_name,
      email,
      password,
      role,
      date_naissance,
      is_activate,
      age,
      validation_code,
      image
    );
    console.log("body :", newUser);

    const userRegister = await Inscription.registerUser(newUser);

    res
      .status(201)
      .json({ message: "User registered successfully", user: userRegister });
  } catch (error) {
    next(error);
  }
}
module.exports = handleUserRegistration;
