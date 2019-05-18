const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Despacho = mongoose.model('Despacho');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/despacho', (req, res, next) =>{
    let despacho = new Despacho()
    despacho.numero = req.body.numero
    despacho.servicio = req.body.servicio
    despacho.origen = req.body.origen
    despacho.destino = req.body.destino
    despacho.vehiculo = req.body.vehiculo

    despacho.save((err, despachoStored) =>{
      if (err) res.status(500).send ({message: 
      'Error al salvar en la base de datos:'+err})
      res.status(200).send({ despacho: despachoStored})
    })
  });

  router.get('/despachos', (req, res, next)=> {
    Despacho.find((err, despachos)=>{
      if(err) return res.status(500).send({message:
          'Error al realizar peticion: '+err})
       if (!despachos) return res.status(404).send({message: 'No existe el despacho'})
       res.status(200).send({despachos})
        });
    });

    router.get('/despachos/:despachoId', (req, res, next)=> {
      let despachoId = req.params.despachoId
      Despacho.findById(despachoId, (err, despacho) =>{
        if (err) return res.status(500).send({menssage: 
          'Error al realizar la peticion: '+ err})
          if (!despacho) return res.status(404).send({menssage: 'El despacho no existe'})
          res.status(200).send({ despacho})
        })
        
      });

      router.put('/despachos/:despachoId', (req, res, next) =>{
        let despachoId = req.params.despachoId
        let despachoUpdate = req.body
  
        Despacho.findByIdAndUpdate(despachoId, despachoUpdate, (err,despachoStored) =>{
          if (err)res.status(500).send({menssage: 'Error al actualizar el despacho:  '+ err})
  
          res.status(200).send ({despachoStored})
        })
    });

    router.delete('/despachos/:despachoId', (req, res, next) => { 
      let despachoId = req.params.despachoId
  
      Despacho.findByIdAndRemove(despachoId,(err, despacho) => {  
      if (err) return res.status(500).send({message:`Error al reliazar petición: ${err}`})
        if (!despacho) return res.status(404).send({message: 'No se encuentra despacho'})
        res.status(200).send({message:'Se ha eliminado Exitosamente'})
      })
    });