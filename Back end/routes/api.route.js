const router = require('express').Router();
const cors = require('cors')
import { PrismaClient} from '@prisma/client'

const prisma =  new PrismaClient()

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
