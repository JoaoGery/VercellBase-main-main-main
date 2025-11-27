import express from 'express';
import multer from 'multer';
import Carro from '../models/carro.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// --------------------------
// LISTAR TODOS OS CARROS
// --------------------------
router.get('/', async (req, res) => {
  try {
    const carros = await Carro.find();
    res.json(carros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------
// PEGAR IMAGEM DE UM CARRO
// --------------------------
router.get('/:id/imagem', async (req, res) => {
  try {
    const carroEncontrado = await Carro.findById(req.params.id);
    if (!carroEncontrado || !carroEncontrado.imagem) {
      return res.status(404).send('Sem imagem');
    }

    res.set('Content-Type', carroEncontrado.imagemTipo);
    res.send(carroEncontrado.imagem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------
// CRIAR NOVO CARRO
// --------------------------
router.post('/', upload.single('imagem'), async (req, res) => {
  try {
    const novoCarro = new Carro({
      marca: req.body.marca,
      modelo: req.body.modelo,
      ano: req.body.ano,
      placa: req.body.placa
    });

    if (req.file) {
      novoCarro.imagem = req.file.buffer;
      novoCarro.imagemTipo = req.file.mimetype;
    }

    await novoCarro.save();
    res.json(novoCarro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------
// EDITAR UM CARRO
// --------------------------
router.put('/:id', upload.single('imagem'), async (req, res) => {
  try {
    const carroExistente = await Carro.findById(req.params.id);
    if (!carroExistente) return res.status(404).json({ error: 'Carro não encontrado' });

    carroExistente.marca = req.body.marca;
    carroExistente.modelo = req.body.modelo;
    carroExistente.ano = req.body.ano;
    carroExistente.placa = req.body.placa;

    if (req.file) {
      carroExistente.imagem = req.file.buffer;
      carroExistente.imagemTipo = req.file.mimetype;
    }

    await carroExistente.save();
    res.json(carroExistente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------
// DELETAR UM CARRO
// --------------------------
router.delete('/:id', async (req, res) => {
  try {
    await Carro.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
