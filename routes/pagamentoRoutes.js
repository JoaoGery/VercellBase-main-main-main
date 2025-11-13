import express from 'express';
import Pagamento from '../models/pagamento.js';

const router = express.Router();

// 🔹 LISTAR PAGAMENTOS
router.get('/', async (req, res) => {
    try {
        const pagamentos = await Pagamento.find().lean();
        res.render('pagamento/lst', { pagamentos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar pagamentos');
    }
});

// 🔹 FORMULÁRIO PARA ADICIONAR PAGAMENTO
router.get('/add', (req, res) => {
    res.render('pagamento/add');
});

// 🔹 SALVAR NOVO PAGAMENTO
router.post('/add', async (req, res) => {
    try {
        const { valor, descricao, moeda = 'BRL' } = req.body;

        const novoPagamento = new Pagamento({
            valor,
            descricao,
            moeda,
            status: 'pendente',
            criadoEm: new Date(),
            atualizadoEm: new Date(),
        });

        await novoPagamento.save();
        res.redirect('/pagamento');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar pagamento');
    }
});

// 🔹 FORMULÁRIO DE EDIÇÃO
router.get('/edit/:id', async (req, res) => {
    try {
        const pagamento = await Pagamento.findById(req.params.id).lean();
        if (!pagamento) return res.status(404).send('Pagamento não encontrado');
        res.render('pagamento/edit', { pagamento });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar pagamento');
    }
});

// 🔹 SALVAR ALTERAÇÕES
router.post('/edit/:id', async (req, res) => {
    try {
        const { valor, descricao, moeda, status } = req.body;
        await Pagamento.findByIdAndUpdate(req.params.id, {
            valor,
            descricao,
            moeda,
            status,
            atualizadoEm: new Date(),
        });
        res.redirect('/pagamento');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar pagamento');
    }
});

// 🔹 DELETAR
router.get('/delete/:id', async (req, res) => {
    try {
        await Pagamento.findByIdAndDelete(req.params.id);
        res.redirect('/pagamento');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar pagamento');
    }
});

export default router;

