const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tipovehiculo = mongoose.model('Tipovehiculo');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/tipovehiculo', (req, res, next) =>{
    let tipovehiculo = new Tipovehiculo()
    tipovehiculo.descripcion = req.body.descripcion

    tipovehiculo.save((err, tipovehiculoStored) =>{
      if (err) res.status(500).send ({message: 
      'Error al salvar en la base de datos:'+err})
      res.status(200).send({ tipovehiculo: tipovehiculoStored})
    })
  });

  router.get('/tipovehiculos', (req, res, next)=> {
    Tipovehiculo.find((err, tipovehiculos)=>{
      if(err) return res.status(500).send({message:
          'Error al realizar peticion: '+err})
       if (!tipovehiculos) return res.status(404).send({message: 'No existe el tipo de vehiculo'})
       res.status(200).send({tipovehiculos})
        });
    });

    router.get('/tipovehiculos/:tipovehiculoId', (req, res, next)=> {
      let tipovehiculoId = req.params.tipovehiculoId
      Tipovehiculo.findById(tipovehiculoId, (err, tipovehiculo) =>{
        if (err) return res.status(500).send({menssage: 
          'Error al realizar la peticion: '+ err})
          if (!tipovehiculo) return res.status(404).send({menssage: 'el tipo de vehiculo no existe'})
          res.status(200).send({ tipovehiculo})
        })
        
      });

      router.put('/tipovehiculos/:tipovehiculoId', (req, res, next) =>{
        let tipovehiculoId = req.params.tipovehiculoId
        let tipovehiculoUpdate = req.body
        
  
        Tipovehiculo.findByIdAndUpdate(tipovehiculoId, tipovehiculoUpdate, (err,tipovehiculoStored) =>{
          if (err)res.status(500).send({menssage: 'Error al actualizar el tipo de vehiculo:  '+ err})
  
          res.status(200).send ({tipovehiculoStored})
        })
    });

    router.delete('/tipovehiculos/:tipovehiculoId', (req, res, next) => { 
      let tipovehiculoId = req.params.tipovehiculoId
  
      Tipovehiculo.findByIdAndRemove(tipovehiculoId,(err, tipovehiculo) => {  
      if (err) return res.status(500).send({message:`Error al reliazar petición: ${err}`})
        if (!tipovehiculo) return res.status(404).send({message: 'No se encuentra el tipo de vehiculo'})
        res.status(200).send({message:'Se ha eliminado Exitosamente'})
      })
    });