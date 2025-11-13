import express from 'express';
import * as ctrl from '../controllers/carro.js';
import Carro from '../models/carro.js';

const router = express.Router();

// ✅ LISTAR CARROS
router.get('/', async (req, res) => {
  try {
    const carros = await Carro.find();
    res.render('carro/lst', { carros, success: null, error: null });
  } catch (error) {
    console.error(error);
    res.render('carro/lst', { carros: [], success: null, error: 'Erro ao carregar lista de carros' });
  }
});

// ✅ FORMULÁRIO DE ADIÇÃO
router.get('/add', (req, res) => {
  res.render('carro/add', { carro: {}, errors: [] });
});

// ✅ SALVAR NOVO CARRO
router.post('/add', async (req, res) => {
  try {
    const novoCarro = new Carro({
      marca: req.body.marca,
      modelo: req.body.modelo,
      placa: req.body.placa,
      ano: req.body.ano,
      diaria: req.body.diaria,
      imagem: req.body.imagem || null, // apenas string opcional
    });

    await novoCarro.save();
    res.redirect('/carro');
  } catch (error) {
    console.error(error);
    res.render('carro/add', {
      carro: req.body,
      errors: [{ msg: 'Erro ao salvar carro. Verifique os campos obrigatórios.' }],
    });
  }
});

// ✅ FORMULÁRIO DE EDIÇÃO
router.get('/:id/editar', async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id);
    if (!carro) {
      return res.redirect('/carro');
    }
    res.render('carro/edt', { carro, errors: [] });
  } catch (error) {
    console.error(error);
    res.redirect('/carro');
  }
});

// ✅ ATUALIZAR CARRO
router.post('/:id', async (req, res) => {
  try {
    await Carro.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/carro');
  } catch (error) {
    console.error(error);
    res.render('carro/edt', { carro: req.body, errors: [{ msg: 'Erro ao atualizar carro.' }] });
  }
});

// ✅ EXCLUIR CARRO
router.post('/:id/delete', async (req, res) => {
  try {
    await Carro.findByIdAndDelete(req.params.id);
    res.redirect('/carro');
  } catch (error) {
    console.error(error);
    res.render('carro/lst', { carros: [], success: null, error: 'Erro ao excluir carro' });
  }
});

// rota de busca: /carros/search?q=xxx
router.get('/search', ctrl.search);

export default router;
