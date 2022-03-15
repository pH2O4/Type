const router = require('express').Router();
const express = require ('express')
const cors = require("cors")
const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')

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
  if(!(verificandoEmail == 0)){ 
    res.json("usuário já cadastrado")
  }else if(pass != passr) {
    res.json("Senhas não conferem");
  }else{
    const TruePassowrd = await bcrypt.hash(req.body.Pass, 10)
    const usuarios = await prisma.Usuarios.create({
data:{
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

module.exports = router;
