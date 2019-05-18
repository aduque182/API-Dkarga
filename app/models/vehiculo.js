const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tipovehiculo = require('../models/tipovehiculo');


const vehiculoSchema = new Schema({
  placa: { type: String, unique: true, required: true},
  tipovehiculo: {type: Schema.Types.ObjectId, ref: Tipovehiculo, required: true},
  
});

mongoose.model('Vehiculo', vehiculoSchema);