const express = require("express");
const Inscription = require("../../service/Register/inscription.js");
const User = require("../../model/Users/user");

async function handleUserRegistration(req, res, next) {
  try {
    const { username, role, email, password, date_naissance, is_activate, age } =
      req.body;
    const newUser = new User(
      username,
      role,
      email,
      password,
      date_naissance,
      is_activate,
      age
    );

    await Inscription.registerUser(newUser);

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}
module.exports = handleUserRegistration;
