const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cliente = require('../models/cliente');
const Tarifa = require('../models/tarifa');

const ServicioSchema = new Schema({
  numero: { type: Number, unique: true, required: true},
  cliente: {type: Schema.Types.ObjectId, ref: Cliente, required: true},
  tarifa: {type: Schema.Types.ObjectId, ref: Tarifa, required: true}
});

mongoose.model('Servicio', ServicioSchema);