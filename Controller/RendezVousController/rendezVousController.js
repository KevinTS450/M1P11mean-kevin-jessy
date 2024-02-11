const express = require("express");
const RendezVousService = require("../service/rendezVous.service");
const RendezVous = require('../model/rendezVous.model')

async function createRendezVous(req, res, next) {
  try {
    const { employee, client, serviceAsked, start, end, isDone, isConfirmed } =
      req.body;
      console.log(req.body)
    const newRendezVous = new RendezVous(
      { idEmp: employee.idEmployee, nomEmp: employee.nomEmployee },
      { idCli: client.idClient, nomCli: client.nomClient },
      { idServ: serviceAsked.idService, nomServ: serviceAsked.nom, prixServ: serviceAsked.prix },
      start,
      end,
      isDone,
      isConfirmed
    );

    await RendezVousService.createRendezVous(newRendezVous);

    res.status(200).json({ message: "RendezVous registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}

const GetRendezVousById = async (req, res) => {
  try {
    // Assuming there is a RendezVous model with findById method
    console.log("Decoded RendezVous ID in Controller:", req.params.id);

    const rendezVous = await RendezVousService.getRendezVousById(req.params.id);
    console.log("RendezVous Details:", rendezVous);

    if (!rendezVous) {
      return res.status(404).json({ message: "RendezVous not found" });
    }

    res.json({ rendezVous });
  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllRendezVous = async (req, res) => {
  try {
    const AllRendezVous = await RendezVousService.GetAllRendezVous();

    if (!AllRendezVous) {
      return res.status(404).json({ message: "RendezVouss not found" });
    } else {
      return res.json({ AllRendezVous });
    }
  } catch (error) {
    console.error(error);
  }
};

async function updateRendezVous(req, res, next) {
  try {
    const { employee, client, serviceAsked, start, end, isDone, isConfirmed } =
      req.body;
    const newRendezVous = new RendezVous(
        { idEmp: employee.idEmployee, nomEmp: employee.nomEmployee },
        { idCli: client.idClient, nomCli: client.nomClient },
        { idServ: serviceAsked.idService, nomServ: serviceAsked.nom, prixServ: serviceAsked.prix },
        start,
        end,
        isDone,
        isConfirmed
    );
    
    await RendezVousService.updateRendezVous(newRendezVous);

    res.status(200).json({ message: "RendezVous registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}

async function deleteRendezVous(req, res, next) {
  try {
    const id = req.params.id;

    await RendezVousService.deleteRendezVousById(id);

    res.status(200).json({ message: "RendezVous registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}

module.exports = {
  createRendezVous,
  GetRendezVousById,
  GetAllRendezVous,
  updateRendezVous,
  deleteRendezVous
};
