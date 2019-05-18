const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  nit: { type: Number, unique: true, required: true},
  nombre: {type: String, unique: false, required: true },
  direccion: {type: String, unique: false, required: true }
});

mongoose.model('Cliente', ClienteSchema);