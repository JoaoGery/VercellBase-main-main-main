import express from 'express';
const router = express.Router();

// Busca o TorneiosController
import TorneiosController from '../controllers/TorneiosController.js'
const controle = new TorneiosController();

const caminhobase = 'torneio/'

router.get('/' + caminhobase + 'add', controle.openAdd);
router.post('/' + caminhobase + 'add', controle.add);
router.get('/' + caminhobase + 'lst', controle.list);
router.post('/' + caminhobase + 'lst', controle.find);

// Rotas para editar e deletar
router.get('/' + caminhobase + 'edt/:id', controle.openEdt);
router.post('/' + caminhobase + 'edt/:id', controle.edt);
router.get('/' + caminhobase + 'del/:id', controle.del);

export default router;
