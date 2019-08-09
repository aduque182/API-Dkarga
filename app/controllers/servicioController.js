const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Servicio = mongoose.model('Servicio');
const auth = require('../middleware/auth');
const Cliente = mongoose.model('Cliente');
const Tarifa = mongoose.model('Tarifa');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/servicio', auth, (req, res, next) => {
  let servicio = new Servicio()
  servicio.numero = req.body.numero
  servicio.cliente = req.body.cliente
  servicio.tarifa = req.body.tarifa

  servicio.save((err, servicioStored) => {
    if (err) return res.status(500).send({
      message:
        'Error al salvar en la base de datos:' + $err
    })
    res.status(200).send({ servicio: servicioStored })
  })
});

router.get('/servicios', auth, (req, res, next) => {
  Servicio.find((err, servicios) => {
    if (err) return res.status(500).send({
      message:
        'Error al realizar peticion: ' + err
    })
    if (!servicios) return res.status(404).send({ message: 'No existe el servicio' })
    Cliente.populate(servicios, { path: "cliente", select: "nombre" }, function (err, servicio) {
      if (err) return res.status(500).send({ message: 'Error al realizar peticion: ' + err })
      Tarifa.populate(servicios, { path: "tarifa", select: "costo" }, function (err, tarifa) {
        if (err) return res.status(500).send({ message: 'Error al realizar peticion: ' + err })
        res.status(200).send({  servicios })

      })

    })
  });
});

router.get('/servicios/:servicioId', auth, (req, res, next) => {
  let servicioId = req.params.servicioId
  Servicio.findById(servicioId, (err, servicio) => {
    if (err) return res.status(500).send({
      menssage:
        'Error al realizar la peticion: ' + err
    })
    if (!servicio) return res.status(404).send({ menssage: 'El servicio no existe' })
    Cliente.populate(servicio, { path: "cliente", select: "nombre" }, function (err, servicio) {
      if (err) return res.status(500).send({ message: 'Error al realizar peticion: ' + err })
      Tarifa.populate(servicio, { path: "tarifa", select: "costo" }, function (err, tarifa) {
        if (err) return res.status(500).send({ message: 'Error al realizar peticion: ' + err })
        res.status(200).send(servicio)

      })

    })
    
  })

});

router.put('/servicios/:servicioId', auth, (req, res, next) => {
  let servicioId = req.params.servicioId
  let servicioUpdate = req.body

  Servicio.findByIdAndUpdate(servicioId, servicioUpdate, (err, servicioStored) => {
    if (err) return res.status(500).send({ menssage: 'Error al actualizar el servicio:  ' + err })

    res.status(200).send({ servicioStored })
  })
});

router.delete('/servicios/:servicioId', auth, (req, res, next) => {
  let servicioId = req.params.servicioId

  Servicio.findByIdAndRemove(servicioId, (err, servicio) => {
    if (err) return res.status(500).send({ message: `Error al reliazar petición: ${err}` })
    if (!servicio) return res.status(404).send({ message: 'No se encuentra el servicio' })
    res.status(200).send({ message: 'Se ha eliminado Exitosamente' })
  })
});


