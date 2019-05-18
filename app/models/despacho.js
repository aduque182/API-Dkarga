const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Servicio = require('../models/servicio');
const Ciudad = require('../models/ciudad');
const Vehiculo = require('../models/vehiculo');

const DespachoSchema = new Schema({
  numero: { type: Number, unique: true, required: true},
  servicio: {type: Schema.Types.ObjectId, ref: Servicio, required: true},
  origen: {type: Schema.Types.ObjectId, ref: Ciudad, required: true},
  destino: {type: Schema.Types.ObjectId, ref: Ciudad, required: true},
  vehiculo: {type: Schema.Types.ObjectId, ref: Vehiculo, required: true}
});

mongoose.model('Despacho', DespachoSchema);