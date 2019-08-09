const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const auth= require('../middleware/auth');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/cliente', (req, res, next) =>{
    let cliente = new Cliente()
    cliente.nit = req.body.nit
    cliente.nombre = req.body.nombre
    cliente.direccion = req.body.direccion

    cliente.save((err, clienteStored) =>{
      if (err) return res.status(500).send ({message: 
      'Error al salvar en la base de datos:'+err})
      res.status(200).send({ cliente: clienteStored})
    })
  });

  router.get('/clientes', (req, res, next)=> {
    Cliente.find((err, clientes)=>{
      if(err) return res.status(500).send({message:
          'Error al realizar peticion: '+err})
       if (!clientes) return res.status(404).send({message: 'No existen clientes'})
       res.status(200).send(clientes)
        });
    });

    router.get('/clientes/:clienteId',auth, (req, res, next)=> {
      let clienteId = req.params.clienteId
      Cliente.findById(clienteId, (err, cliente) =>{
        if (err) return res.status(500).send({menssage: 
          'Error al realizar la peticion: '+ err})
          if (!cliente) return res.status(404).send({menssage: 'El cliente no existe'})
          res.status(200).send( cliente)
        })
        
      });

      router.put('/clientes/:clienteId', auth,(req, res, next) =>{
        let clienteId = req.params.clienteId
        let clienteUpdate = req.body
  
        Cliente.findByIdAndUpdate(clienteId, clienteUpdate, (err,clienteStored) =>{
          if (err) return res.status(500).send({menssage: 'Error al actualizar el cliente:  '+ err})
  
          res.status(200).send ({clienteStored})
        })
    });

    router.delete('/clientes/:clienteId', (req, res, next) => { 
      let clienteId = req.params.clienteId
  
      Cliente.findByIdAndRemove(clienteId,(err, cliente) => {  
      if (err) return res.status(500).send({message:`Error al reliazar petición: ${err}`})
        if (!cliente) return res.status(404).send({message: 'No se encuentra Cliente, llamelo mas tarde'})
        res.status(200).send({message:'Se ha eliminado Exitosamente'})
      })
    });

    

  




  