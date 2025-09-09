import express from 'express';
const router = express.Router();
//Busca o AlunoController
import CursoController from '../controllers/CursoController.js'
const controle = new CursoController();

const caminhobase = 'curso/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
export default router