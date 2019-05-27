const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ciudad = mongoose.model('Ciudad');
const auth= require('../middleware/auth');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/ciudad', auth,(req, res, next) =>{
    let ciudad = new Ciudad()
    ciudad.nombre = req.body.nombre

    ciudad.save((err, ciudadStored) =>{
      if (err) return res.status(500).send ({message: 
      'Error al salvar en la base de datos:'+err})
      res.status(200).send({ ciudad: ciudadStored})
    })
  });
  router.get('/ciudades', auth,(req, res, next)=> {
    Ciudad.find((err, ciudades)=>{
      if(err) return res.status(500).send({message:
          'Error al realizar peticion: '+err})
       if (!ciudades) return res.status(404).send({message: 'No existe ciudad'})
       res.status(200).send({ciudades})
        });
    });

    router.get('/ciudades/:ciudadId', auth,(req, res, next)=> {
      let ciudadId = req.params.ciudadId
      Ciudad.findById(ciudadId, (err, ciudad) =>{
        if (err) return res.status(500).send({menssage: 
          'Error al realizar la peticion: '+ err})
          if (!ciudad) return res.status(404).send({menssage: 'La ciudad no existe'})
          res.status(200).send({ ciudad})
        })
        
      });

      router.put('/ciudades/:ciudadId', auth,(req, res, next) =>{
        let ciudadId = req.params.ciudadId
        let ciudadUpdate = req.body
  
        Ciudad.findByIdAndUpdate(ciudadId, ciudadUpdate, (err,ciudadStored) =>{
          if (err)return res.status(500).send({menssage: 'Error al actualizar la ciudad:  '+ err})
  
          res.status(200).send ({ciudadStored})
        })
    });

    router.delete('/ciudades/:ciudadId',auth, (req, res, next) => { 
      let ciudadId = req.params.ciudadId
  
      Ciudad.findByIdAndRemove(ciudadId,(err, ciudad) => {  
      if (err) return res.status(500).send({message:`Error al reliazar petición: ${err}`})
        if (!ciudad) return res.status(404).send({message: 'No se encuentra la ciudad'})
        res.status(200).send({message:'Se ha eliminado Exitosamente'})
      })
    });