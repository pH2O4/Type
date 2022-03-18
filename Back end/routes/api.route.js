const router = require('express').Router();
const express = require('express')
const cors = require("cors")
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
require('dotenv').config({ path: __dirname + '/.env' });
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient()
router.use(cors())
router.use(express.json())


router.post('/Criarusuario', async (req, res, next) => {

  const email = req.body.Email
  const pass = req.body.Pass
  const name = req.body.Name
  const number = req.body.Number
  const passr = req.body.PassR

  const verificandoEmail = await prisma.Usuarios.findMany({
    where: {
      Email: email,
    }
  })
  if (!(verificandoEmail == 0)) {
    res.json("usuário já cadastrado")
  } else if (pass != passr) {
    res.json("Senhas não conferem");
  } else {
    const TruePassowrd = await bcrypt.hash(req.body.Pass, 10)
    const usuarios = await prisma.Usuarios.create({
      data: {
        Email: email,
        Senha: TruePassowrd,
        Name: name,
        Contato: number,
        Name: name
      }
    })

    res.send("Parabéns sua conta foi criada! estamos te encaminhando para area de login")
  }

});


router.post('/Login', async (req, res, next) => {

  const email = req.body.Email
  const pass = req.body.Pass
  const EMAILPRO = await prisma.Usuarios.findUnique({
    where: {
      Email: email,
    },
  })


  if (EMAILPRO == null) {
    res.send("You are not register")

  } else if (EMAILPRO != null) {
    const TruePasss = EMAILPRO.Senha
    if (await bcrypt.compare(pass, TruePasss)) {

      const IDFORJWT = EMAILPRO.Id
      const token = jwt.sign({ IDFORJWT }, process.env.SECRET, {
        expiresIn: 30000

      });
      res.json({ auth: true, token: token });
    } else {
      res.send("Icorrect Password")
    }

  }

});

router.post('/Auth', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.json({ auth: false, message: 'Failed to authenticate token.' });

      req.userId = decoded.id;
      next();
    });

})

router.get('/lgoff', async (req, res, next) => {
  res.json({ auth: false, token: null });
})


module.exports = router;
