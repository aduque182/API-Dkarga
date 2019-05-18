const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipovehiculoSchema = new Schema({
  descripcion: {type: String, unique: true, required: true }
  
});

mongoose.model('Tipovehiculo', TipovehiculoSchema);