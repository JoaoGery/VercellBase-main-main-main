import Pagamento from '../models/pagamento.js';
import Reserva from '../models/reserva.js';

export const list = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find().populate('reserva').lean();
    res.render('pagamento/list', { pagamentos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar pagamentos');
  }
};

export const view = async (req, res) => {
  try {
    const pagamento = await Pagamento.findById(req.params.id).populate('reserva').lean();
    if (!pagamento) return res.status(404).send('Pagamento não encontrado');
    res.render('pagamento/view', { pagamento });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar pagamento');
  }
};

export const formCreate = async (req, res) => {
  try {
    const reservas = await Reserva.find().lean();
    res.render('pagamento/form', { pagamento: {}, reservas });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao abrir formulário de pagamento');
  }
};

export const create = async (req, res) => {
  try {
    const { reserva: reservaId, metodo, valor, pagoEm, status } = req.body;
    const reserva = await Reserva.findById(reservaId);
    if (!reserva) return res.status(400).send('Reserva inválida');

    const pagamentoData = {
      reserva: reservaId,
      metodo,
      valor: valor ? Number(valor) : (reserva.valorTotal || 0),
      pagoEm: pagoEm ? new Date(pagoEm) : undefined,
      status: status || 'pendente'
    };

    await Pagamento.create(pagamentoData);
    res.redirect('/pagamentos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar pagamento');
  }
};

export const formEdit = async (req, res) => {
  try {
    const pagamento = await Pagamento.findById(req.params.id).lean();
    if (!pagamento) return res.status(404).send('Pagamento não encontrado');
    const reservas = await Reserva.find().lean();
    res.render('pagamento/form', { pagamento, reservas });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao abrir edição de pagamento');
  }
};

export const update = async (req, res) => {
  try {
    const { reserva: reservaId, metodo, valor, pagoEm, status } = req.body;
    const update = {
      reserva: reservaId,
      metodo,
      valor: valor ? Number(valor) : undefined,
      pagoEm: pagoEm ? new Date(pagoEm) : undefined,
      status
    };
    Object.keys(update).forEach(k => update[k] === undefined && delete update[k]);
    await Pagamento.findByIdAndUpdate(req.params.id, update);
    res.redirect('/pagamentos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar pagamento');
  }
};

export const remove = async (req, res) => {
  try {
    await Pagamento.findByIdAndDelete(req.params.id);
    res.redirect('/pagamentos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir pagamento');
  }
};