const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Character = mongoose.model("Character", {
  name: { type: String, required: true },
  height: { type: Number, required: true },
  mass: { type: Number, required: true },
  hair_color: { type: String, required: true },
  skin_color: { type: String, required: true },
  eye_color: { type: String, required: true },
  birth_year: String,
  gender: { type: String, required: true },
  homeworld: String,
  films: Array,
  species: Array,
  vehicles: Array,
  starships: Array,
  picture_url: String,
  created: { type: Date, default: Date.now() },
  edited: { type: Date, default: Date.now() },
});

module.exports = Character;
