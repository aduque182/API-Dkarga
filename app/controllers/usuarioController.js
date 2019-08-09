const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const service = require('../services/usuarioServices');
const auth= require('../middleware/auth');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/usuario', auth, (req, res, next) =>{
    let usuario = new Usuario()
    usuario.email = req.body.email
    usuario.displayName = req.body.displayName
    usuario.password = req.body.password
    usuario.signupDate = req.body.signupDate
    //usuario.lastLogin = req.body.lastLogin

    usuario.save((err, usuarioStored) =>{
      if (err) return res.status(500).send ({message: 
      'Error al salvar en la base de datos:'+err})
      res.status(200).send({ token: service.createToken(usuarioStored)})
    })
});

router.get('/usuarios', (req, res, next)=> {
    Usuario.find((err, usuarios)=>{
      if(err) return res.status(500).send({message:
          'Error al realizar peticion: '+err})
       if (!usuarios) return res.status(404).send({message: 'No existen clientes'})
       res.status(200).send(usuarios)
        });
    });

    /*metodo obtener token*/
    router.post('/signin',  (req, res, next) =>{
        Usuario.findOne({ email: req.body.email }, (err, user) => {
            if (err) return res.status(500).send({ message: 
              `Error al ingresar: ${err}` })
            if (!user) return res.status(404).send({ message: 
              `No existe el usuario: ${req.body.email}` })
        
            return user.comparePassword(req.body.password,
               (err, isMatch) => {
              if (err) return res.status(500).send(
                { message: `Error al ingresar: ${err}` })
              if (!isMatch) return res.status(404).send(
                { message: `Error de contraseña: ${req.body.email}` })
        
              req.user = user
              return res.status(200).send({ message: 
                'Te has logueado correctamente', 
                token: service.createToken(user)})
            });      
          }).select('_id email password');
    
    });
    