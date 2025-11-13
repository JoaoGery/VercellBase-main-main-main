import Reserva from '../models/reserva.js';
import Carro from '../models/carro.js';
import Cliente from '../models/cliente.js';

export const list = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('carro cliente').lean();
    res.render('reserva/list', { reservas });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar reservas');
  }
};

export const view = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('carro cliente').lean();
    if (!reserva) return res.status(404).send('Reserva não encontrada');
    res.render('reserva/view', { reserva });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar reserva');
  }
};

export const formCreate = async (req, res) => {
  try {
    const carros = await Carro.find({ disponivel: true }).lean();
    const clientes = await Cliente.find().lean();
    res.render('reserva/form', { reserva: {}, carros, clientes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao abrir formulário de reserva');
  }
};

export const create = async (req, res) => {
  try {
    const { carro: carroId, cliente: clienteId, inicio, fim } = req.body;
    const carro = await Carro.findById(carroId);
    const cliente = await Cliente.findById(clienteId);
    if (!carro) return res.status(400).send('Carro inválido');
    if (!cliente) return res.status(400).send('Cliente inválido');

    const inicioD = new Date(inicio);
    const fimD = new Date(fim);
    const diffDays = Math.max(1, Math.ceil((fimD - inicioD) / (1000 * 60 * 60 * 24)));
    const valorTotal = (carro.diaria || 0) * diffDays;

    const reserva = await Reserva.create({
      carro: carroId,
      cliente: clienteId,
      inicio: inicioD,
      fim: fimD,
      valorTotal,
      status: 'reservado'
    });

    carro.disponivel = false;
    await carro.save();

    res.redirect('/reservas');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar reserva');
  }
};

export const formEdit = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).lean();
    if (!reserva) return res.status(404).send('Reserva não encontrada');
    const carros = await Carro.find().lean();
    const clientes = await Cliente.find().lean();
    res.render('reserva/form', { reserva, carros, clientes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao abrir edição de reserva');
  }
};

export const update = async (req, res) => {
  try {
    const { carro: carroId, cliente: clienteId, inicio, fim, status } = req.body;
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).send('Reserva não encontrada');

    const inicioD = inicio ? new Date(inicio) : reserva.inicio;
    const fimD = fim ? new Date(fim) : reserva.fim;

    let valorTotal = reserva.valorTotal;
    if (carroId && (carroId.toString() !== reserva.carro.toString() || inicio || fim)) {
      const carroNovo = await Carro.findById(carroId);
      if (!carroNovo) return res.status(400).send('Carro inválido');
      const diffDays = Math.max(1, Math.ceil((fimD - inicioD) / (1000 * 60 * 60 * 24)));
      valorTotal = (carroNovo.diaria || 0) * diffDays;
    } else if (inicio || fim) {
      const carroAtual = await Carro.findById(reserva.carro);
      const diffDays = Math.max(1, Math.ceil((fimD - inicioD) / (1000 * 60 * 60 * 24)));
      valorTotal = (carroAtual.diaria || 0) * diffDays;
    }

    // if carro changed, free old and occupy new
    if (carroId && carroId.toString() !== reserva.carro.toString()) {
      const carroAntigo = await Carro.findById(reserva.carro);
      const carroNovo = await Carro.findById(carroId);
      if (carroAntigo) { carroAntigo.disponivel = true; await carroAntigo.save(); }
      if (carroNovo) { carroNovo.disponivel = false; await carroNovo.save(); }
    }

    reserva.carro = carroId || reserva.carro;
    reserva.cliente = clienteId || reserva.cliente;
    reserva.inicio = inicioD;
    reserva.fim = fimD;
    reserva.valorTotal = valorTotal;
    if (status) reserva.status = status;

    // se status finalizado ou cancelado, liberar carro
    if (status === 'finalizado' || status === 'cancelado') {
      const carro = await Carro.findById(reserva.carro);
      if (carro) { carro.disponivel = true; await carro.save(); }
    }

    await reserva.save();
    res.redirect('/reservas');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar reserva');
  }
};

export const remove = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (reserva) {
      const carro = await Carro.findById(reserva.carro);
      if (carro) {
        carro.disponivel = true;
        await carro.save();
      }
    }
    res.redirect('/reservas');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir reserva');
  }
};