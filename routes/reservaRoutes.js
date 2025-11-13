import express from 'express';
import Reserva from '../models/reserva.js';

const router = express.Router();

// 🟢 GET - listar todas as reservas
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao buscar reservas', details: err.message });
    }
});

// 🟢 GET - buscar uma reserva pelo ID
router.get('/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);
        if (!reserva) return res.status(404).json({ error: 'Reserva não encontrada' });
        res.json(reserva);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao buscar reserva', details: err.message });
    }
});

// 🟢 POST - criar nova reserva
router.post('/', async (req, res) => {
    try {
        const newReserva = new Reserva(req.body);
        const saved = await newReserva.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: 'Falha ao criar reserva', details: err.message });
    }
});

// 🟡 PUT - atualizar reserva
router.put('/:id', async (req, res) => {
    try {
        const updated = await Reserva.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        if (!updated) return res.status(404).json({ error: 'Reserva não encontrada' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Falha ao atualizar reserva', details: err.message });
    }
});

// 🔴 DELETE - deletar reserva
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Reserva.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Reserva não encontrada' });
        res.json({ message: 'Reserva deletada', id: deleted._id });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar reserva', details: err.message });
    }
});

export default router;
