const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tarifa = mongoose.model('Tarifa');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/tarifa', (req, res, next) =>{
    let tarifa = new Tarifa()
    tarifa.codigo = req.body.codigo
    tarifa.cliente = req.body.cliente
    tarifa.costo = req.body.costo

    tarifa.save((err, tarifaStored) =>{
      if (err) res.status(500).send ({message: 
      'Error al salvar en la base de datos:'+err})
      res.status(200).send({ tarifa: tarifaStored})
    })
  });

  router.get('/tarifas', (req, res, next)=> {
    Tarifa.find((err, tarifas)=>{
      if(err) return res.status(500).send({message:
          'Error al realizar peticion: '+err})
       if (!tarifas) return res.status(404).send({message: 'No existen la tarifa'})
       res.status(200).send({tarifas})
        });
    });

    router.get('/tarifas/:tarifaId', (req, res, next)=> {
      let tarifaId = req.params.tarifaId
      Tarifa.findById(tarifaId, (err, tarifa) =>{
        if (err) return res.status(500).send({menssage: 
          'Error al realizar la peticion: '+ err})
          if (!tarifa) return res.status(404).send({menssage: 'La tarifa no existe'})
          res.status(200).send({ tarifa})
        })
        
      });

      router.put('/tarifas/:tarifaId', (req, res, next) =>{
        let tarifaId = req.params.tarifaId
        let tarifaUpdate = req.body
  
        Tarifa.findByIdAndUpdate(tarifaId, tarifaUpdate, (err,tarifaStored) =>{
          if (err)res.status(500).send({menssage: 'Error al actualizar la tarifa:  '+ err})
  
          res.status(200).send ({tarifaStored})
        })
    });

    router.delete('/tarifas/:tarifaId', (req, res, next) => { 
      let tarifaId = req.params.tarifaId
  
      Tarifa.findByIdAndRemove(tarifaId,(err, tarifa) => {  
      if (err) return res.status(500).send({message:`Error al reliazar petición: ${err}`})
        if (!tarifa) return res.status(404).send({message: 'No se encuentra la tarifa'})
        res.status(200).send({message:'Se ha eliminado Exitosamente'})
      })
    });