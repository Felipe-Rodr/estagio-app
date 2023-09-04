import { Router } from 'express'
import usuarioRouter from './usuario/router.js'
import clientesRouter from './clientes/router.js'
import pessoasRouter from './pessoas/router.js'


const router = Router();

router
.use('/usuario', usuarioRouter)
.use('/clientes', clientesRouter)
.use('/pessoas', pessoasRouter)



export default router;