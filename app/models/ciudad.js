const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CiudadSchema = new Schema({
  nombre: {type: String, unique: true, required: true }
  
});

mongoose.model('Ciudad', CiudadSchema);