const router = require('express').Router();
const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
require('dotenv').config({ path: __dirname + '/.env' });
const jwt = require('jsonwebtoken');
const { response } = require('express');


const prisma = new PrismaClient()
router.use(cors())
router.use(express.json())

router.get('/GetAllCalass', async (req, res, next) => {
  const allClass = await prisma.Class.findMany({})
  res.json(allClass)
})

router.post('/DeletingUser', async (req, res, next) => {
 const EmailX = req.body.EmailXy
  console.log(EmailX)
  const deleteuser = await prisma.Usuarios.delete({
    where: {
      Email: EmailX,
    },
  })
  res.send("Your user has been delected")
})



router.get('/GetAllCalass', async (req, res, next) => {
  const allClass = await prisma.Class.findMany({})
  res.json(allClass)
})

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
      res.json({ auth: true, token: token, Email: EMAILPRO.Email });
    } else {
      res.send("Icorrect Password")
    }

  }

});


router.get('/GettingAllProducts', async (req, res, next) => {
  const allProducts = await prisma.produtos.findMany({})
  res.json(allProducts)
})

router.post('/Auth', async (req, res, next) => {
  const token = req.body.TOKENX;
  if (!token) return res.json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.json({ auth: false, message: 'Failed to authenticate token.' });
    res.send('ok')
    req.userId = decoded.id;
    next();
  });

})

router.post('/lgoff', async (req, res, next) => {
  res.json({ auth: false, token: null });
})


router.post('/ReciveProductsRoute', async (req, res, next) => {
  const produto = req.body.ProductN
  const classiD = req.body.ClassP
  const amount = req.body.AmountP
  const amountconvert = parseInt(amount)
  if (!classiD) {
    res.send('por favor selecione uma classe')
  } else if (isNaN(amountconvert)) {
    res.send("por favor informe a quantidade")
  } else {

    try {
      const produtos = await prisma.produtos.create({
        data: {
          NameProduct: produto,
          Amount: amountconvert,
          className: classiD,

        }
      })
      if (produtos) {
        res.send('Criado com sucesso')
      } else {
        res.send('ocorreu um erro')
      }
    } catch (error) {
      const uptadeProduct = await prisma.produtos.findUnique({
        where: {
          NameProduct: produto,
        },
      })

      const ActualValue = uptadeProduct.Amount
      const updateUser = await prisma.produtos.update({
        where: {
          NameProduct: produto,
        },
        data: {
          Amount: ActualValue + amountconvert,
        },
      })
      res.send('Identificamos que seu produto já existia e atualizamos os dados')
    }

  }
})

router.post('/CheckingTheCLass', async (req, res, next) => {
  const productNamex = req.body.Product
  const lookingforproduct = await prisma.produtos.findUnique({
    where: {
      NameProduct: productNamex
    }
  })
  if (lookingforproduct == null) {
    res.send("nothing founded")
  } else {
    res.json(lookingforproduct.className)
  }
})

router.post('/RegisterClass', async (req, res, next) => {
  const productClasSc = req.body.ClassPCREATE
  try {
    const creatinClassxy = await prisma.Class.create({
      data: {
        Name: productClasSc
      },
    })
    res.send("Created Class")
  } catch (error) {
    res.send("Sua Classe já existe")
  }

})

router.post('/GetUserInformations', async (req, res, next) => {
  const EMAILX = req.body.EmailX
  const Userinformations = await prisma.Usuarios.findUnique({
    where: {
      Email: EMAILX
    }
  })
  res.json({
    Contato: Userinformations.Contato, Email: Userinformations.Email,
    Name: Userinformations.Name
  })
})

module.exports = router;
