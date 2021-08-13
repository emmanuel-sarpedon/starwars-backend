const express = require("express");
const router = express.Router();
const Character = require("../models/Character"); // import du modèle "Character"

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
      // on vérifie qu'on a l'ensemble des paramètres requis
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

      res.status(200).json(newCharacter);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
