import Cliente from '../models/cliente.js';

export const list = async (req, res) => {
  try {
    const clientes = await Cliente.find().lean();
    res.render('cliente/list', { clientes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar clientes');
  }
};

export const view = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id).lean();
    if (!cliente) return res.status(404).send('Cliente não encontrado');
    res.render('cliente/view', { cliente });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar cliente');
  }
};

export const formCreate = (req, res) => {
  res.render('cliente/form', { cliente: {} });
};

export const create = async (req, res) => {
  try {
    const data = {
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone || '',
      documento: req.body.documento || ''
    };
    await Cliente.create(data);
    res.redirect('/clientes');
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(400).send('Email já cadastrado');
    res.status(500).send('Erro ao criar cliente');
  }
};

export const formEdit = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id).lean();
    if (!cliente) return res.status(404).send('Cliente não encontrado');
    res.render('cliente/form', { cliente });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao abrir edição');
  }
};

export const update = async (req, res) => {
  try {
    const update = {
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone || undefined,
      documento: req.body.documento || undefined
    };
    Object.keys(update).forEach(k => update[k] === undefined && delete update[k]);
    await Cliente.findByIdAndUpdate(req.params.id, update);
    res.redirect('/clientes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar cliente');
  }
};

export const remove = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.redirect('/clientes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir cliente');
  }
};