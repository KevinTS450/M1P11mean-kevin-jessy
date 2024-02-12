const express = require("express");
const Inscription = require("../../service/Register/inscription.js");
const User = require("../../model/Users/user");

async function handleUserRegistration(req, res, next) {
  try {
    const {
      username,
      email,
      password,
      role,
      date_naissance,
      age,
      validation_code,
    } = req.body;
    const newUser = new User(
      username,
      email,
      password,
      role,
      date_naissance,
      age,
      validation_code
    );

    await Inscription.registerUser(newUser);

    res
      .status(200)
      .json({ message: "User registered successfully :" + newUser });
  } catch (error) {
    next(error);
  }
}
module.exports = handleUserRegistration;
