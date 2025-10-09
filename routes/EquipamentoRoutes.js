import express from 'express';
import multer from 'multer';
const upload = multer();

const router = express.Router();

// Busca o EquipamentosController
import EquipamentosController from '../controllers/EquipamentosController.js'
const controle = new EquipamentosController();

const caminhobase = 'equipamento/'

// Rotas para adicionar
router.get('/' + caminhobase + 'add', controle.openAdd);
router.post('/' + caminhobase + 'add', upload.single('imagem'), controle.add);

// Rotas para listar e buscar
router.get('/' + caminhobase + 'lst', controle.list);
router.post('/' + caminhobase + 'lst', controle.find);

// Rotas para editar
router.get('/' + caminhobase + 'edt/:id', controle.openEdt);
router.post('/' + caminhobase + 'edt/:id', upload.single('imagem'), controle.edt);

// Rota para deletar
router.get('/' + caminhobase + 'del/:id', controle.del);

export default router;
