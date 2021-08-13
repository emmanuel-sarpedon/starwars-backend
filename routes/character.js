const express = require("express");
const router = express.Router();
const Character = require("../models/Character"); // import du modèle Mongoose "Character"

// -- CREATE --
router.post("/character/create", async (req, res) => {
  try {
    const {
      name, //required
      height, //required
      mass, //required
      hair_color, //required
      skin_color, //required
      eye_color, //required
      birth_year,
      gender, //required
      homeworld,
      films,
      species,
      vehicles,
      starships,
    } = req.fields;

    if (
      // on check s'il manque des paramètres obligatoires
      !name ||
      !height ||
      !mass ||
      !hair_color ||
      !skin_color ||
      !eye_color ||
      !gender
    ) {
      res.status(400).json({ error: "Missing parameters" });
    } else {
      const newCharacter = new Character({
        name: name,
        height: height,
        mass: mass,
        hair_color: hair_color,
        skin_color: skin_color,
        eye_color: eye_color,
        birth_year: birth_year,
        gender: gender,
        homeworld: homeworld,
        films: films,
        species: species,
        vehicles: vehicles,
        starships: starships,
      });

      await newCharacter.save();

      res.status(201).json(newCharacter);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- READ --
// All characters
router.get("/characters", async (req, res) => {
  try {
    const { name } = req.query;
    let filters = {};

    if (name) {
      filters.name = new RegExp(name, "i"); // filtre 'name' non sensible à la casse
    }

    const characters = await Character.find(filters);

    if (characters) {
      const count = await Character.find(filters).countDocuments();
      res.status(200).json({ count: count, data: characters });
    } else {
      res.status(204); // Statut HTTP : No Content
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// One character
router.get("/character/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (character) {
      res.status(200).json(character);
    } else {
      res.status(204); // Statut HTTP : No Content
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
