import express from 'express';
import multer from 'multer';
import Carro from '../models/carro.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// LISTAR
router.get('/', async (req, res) => {
  const carros = await Carro.find();
  res.json(carros);
});

// CRIAR
router.post('/', upload.single('imagem'), async (req, res) => {
  const carro = new Carro({
    marca: req.body.marca,
    modelo: req.body.modelo,
    ano: req.body.ano,
    placa: req.body.placa
  });

  if (req.file) {
    carro.imagem = req.file.buffer;
    carro.imagemTipo = req.file.mimetype;
  }

  await carro.save();
  res.json(carro);
});

// EDITAR
router.put('/:id', upload.single('imagem'), async (req, res) => {
  const carro = await Carro.findById(req.params.id);
  if (!carro) return res.status(404).json({ error: 'Carro não encontrado' });

  carro.marca = req.body.marca;
  carro.modelo = req.body.modelo;
  carro.ano = req.body.ano;
  carro.placa = req.body.placa;

  if (req.file) {
    carro.imagem = req.file.buffer;
    carro.imagemTipo = req.file.mimetype;
  }

  await carro.save();
  res.json(carro);
});

// DELETAR
router.delete('/:id', async (req, res) => {
  await Carro.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
