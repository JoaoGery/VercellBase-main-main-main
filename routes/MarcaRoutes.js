import express from 'express';
const router = express.Router();

// Importa o controller
import MarcasController from '../controllers/MarcasController.js'
const controle = new MarcasController();

const caminhobase = 'marca/'

// Rotas de CRUD
router.get('/' + caminhobase + 'add', controle.openAdd);
router.post('/' + caminhobase + 'add', controle.add);
router.get('/' + caminhobase + 'lst', controle.list);
router.post('/' + caminhobase + 'lst', controle.find);

// Rotas de edição e exclusão
router.get('/' + caminhobase + 'edt/:id', controle.openEdt);
router.post('/' + caminhobase + 'edt/:id', controle.edt);
router.get('/' + caminhobase + 'del/:id', controle.del);

export default router;
