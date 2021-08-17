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
      picture_url,
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
        picture_url: picture_url,
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
    const { name, page, limit } = req.query;
    let filters = {};
    let skip = 0;
    let numberOfResults = limit || 5; // par défaut, renvoie 5 résultats maximum

    if (name) {
      filters.name = new RegExp(name, "i"); // filtre 'name' non sensible à la casse
    }

    if (page) {
      skip = Math.max((Number(page) - 1) * Number(numberOfResults), 0); // si l'utilisateur envoie une page < 0, skip = 0
    }

    const characters = await Character.find(filters)
      .limit(Number(numberOfResults))
      .skip(skip);

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
      res.status(400).json({ message: "Character Not found" }); // Statut HTTP : No Content
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- UPDATE --
router.put("/character/update/:id", async (req, res) => {
  try {
    const characterToUpdate = await Character.findById(req.params.id);

    const {
      name,
      height,
      mass,
      hair_color,
      skin_color,
      eye_color,
      gender,
      films,
      species,
      vehicles,
      starships,
      picture_url,
    } = req.fields;

    if (
      // si on trouve un personne à modifier, et si au moins un paramètre est à modifier
      characterToUpdate &&
      (name ||
        height ||
        mass ||
        hair_color ||
        skin_color ||
        eye_color ||
        gender ||
        films ||
        species ||
        vehicles ||
        starships ||
        picture_url)
    ) {
      // (() => {
      //   Object.keys(req.fields).forEach((e, i) => {
      //     characterToUpdate[e] = Object.values(req.fields)[i];
      //   });
      // })();

      if (name) {
        characterToUpdate.name = name;
      }

      if (height) {
        characterToUpdate.height = height;
      }

      if (mass) {
        characterToUpdate.mass = mass;
      }

      if (hair_color) {
        characterToUpdate.hair_color = hair_color;
      }

      if (skin_color) {
        characterToUpdate.skin_color = skin_color;
      }

      if (eye_color) {
        characterToUpdate.eye_color = eye_color;
      }

      if (gender) {
        characterToUpdate.gender = gender;
      }

      if (films) {
        characterToUpdate.films = films;
      }

      if (species) {
        characterToUpdate.species = species;
      }

      if (vehicles) {
        characterToUpdate.vehicles = vehicles;
      }

      if (starships) {
        characterToUpdate.starships = starships;
      }

      if (picture_url) {
        characterToUpdate.picture_url = picture_url;
      }

      characterToUpdate.edited = Date.now();

      await characterToUpdate.save();

      res.status(200).json(characterToUpdate);
    } else if (!characterToUpdate) {
      // si aucun personnage trouvé avec l'id renseigné
      res.status(400).json({ message: "Character not found" });
    } else {
      // si aucun paramètre n'est à modifier
      res.status(400).json({ message: "No parameters to update" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- DELETE --
router.delete("/character/delete/:id", async (req, res) => {
  try {
    const result = await Character.deleteOne({ _id: req.params.id });
    // .deleteOne renvoie un objet
    // {
    //   ok: 1 si aucune erreur rencontrée
    //   n: le nombre de document(s) supprimé(s)
    //   deletedCount: le nombre de document(s) supprimé(s). Equivalent à n
    // }

    if (result.n === 1) {
      res.status(200).json({ message: "Character deleted" });
    } else {
      res.status(400).json({ error: "Character not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
