const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vehiculo = mongoose.model('Vehiculo');
const auth= require('../middleware/auth');
const Tipovehiculo = mongoose.model('Tipovehiculo');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/vehiculo', auth,(req, res, next) =>{
    let vehiculo = new Vehiculo()
    vehiculo.placa = req.body.placa
    vehiculo.tipovehiculo = req.body.tipovehiculo
   

    vehiculo.save((err, vehiculoStored) =>{
      if (err) return res.status(500).send ({message: 
      'Error al salvar en la base de datos:'+err})
        res.status(200).send({ vehiculo: vehiculoStored})
      
    })
  });

  router.get('/vehiculos', auth,(req, res, next)=> {
    Vehiculo.find((err, vehiculos)=>{
      if(err) return res.status(500).send({message:
          'Error al realizar peticion: '+err})
       if (!vehiculos) return res.status(404).send({message: 'No existen el vehiculo'})
       Tipovehiculo.populate(vehiculos, {path:"tipovehiculo", select:"descripcion"}, function(err, tipovehiculo){
        res.status(200).send({ vehiculo: vehiculos})
      })
       
        });
    });

    router.get('/vehiculos/:vehiculoId', auth,(req, res, next)=> {
      let vehiculoId = req.params.vehiculoId
      Vehiculo.findById(vehiculoId, (err, vehiculo) =>{
        if (err) return res.status(500).send({menssage: 
          'Error al realizar la peticion: '+ err})
          if (!vehiculo) return res.status(404).send({menssage: 'El vehiculo no existe'})
          Tipovehiculo.populate(vehiculo, {path:"tipovehiculo", select:"descripcion"}, function(err, tipovehiculo){
            res.status(200).send({ vehiculo})
          })
        })
        
      });

      
      router.put('/vehiculos/:vehiculoId',auth, (req, res, next) =>{
        let vehiculoId = req.params.vehiculoId
        let vehiculoUpdate = req.body
        
  
        Vehiculo.findByIdAndUpdate(vehiculoId, vehiculoUpdate, (err,vehiculoStored) =>{
          if (err) return res.status(500).send({menssage: 'Error al actualizar el vehiculo:  '+ err})
  
          res.status(200).send ({vehiculoStored})
        })
    });

    router.delete('/vehiculos/:vehiculoId', auth,(req, res, next) => { 
      let vehiculoId = req.params.vehiculoId
  
      Vehiculo.findByIdAndRemove(vehiculoId,(err, vehiculo) => {  
      if (err) return res.status(500).send({message:`Error al reliazar petición: ${err}`})
        if (!vehiculo) return res.status(404).send({message: 'No se encuentra el vehiculo'})
        res.status(200).send({message:'Se ha eliminado Exitosamente'})
      })
    });