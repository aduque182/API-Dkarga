const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cliente = require('../models/cliente');

const TarifaSchema = new Schema({
  codigo: { type: Number, unique: true, required: true},
  cliente: {type: Schema.Types.ObjectId, ref: Cliente, required: true},
  costo: {type: String, unique: false, required: true }
});

mongoose.model('Tarifa', TarifaSchema);