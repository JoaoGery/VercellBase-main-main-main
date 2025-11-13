import Carro from '../models/carro.js';

export const list = async (req, res) => {
  try {
    const carros = await Carro.find().lean();
    res.render('carro/list', { carros });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar carros');
  }
};

export const view = async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id).lean();
    if (!carro) return res.status(404).send('Carro não encontrado');
    res.render('carro/view', { carro });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar carro');
  }
};

export const formCreate = (req, res) => {
  res.render('carro/form', { carro: {} });
};

export const create = async (req, res) => {
  try {
    const data = {
      placa: req.body.placa,
      modelo: req.body.modelo,
      marca: req.body.marca,
      ano: req.body.ano ? Number(req.body.ano) : undefined,
      diaria: req.body.diaria ? Number(req.body.diaria) : undefined,
      disponivel: req.body.disponivel === 'on' ? true : (req.body.disponivel === 'false' ? false : true)
    };
    if (req.file) {
      data.imagem = req.file.buffer;
      data.imagemTipo = req.file.mimetype;
    }
    await Carro.create(data);
    res.redirect('/carros');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar carro');
  }
};

export const formEdit = async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id).lean();
    if (!carro) return res.status(404).send('Carro não encontrado');
    res.render('carro/form', { carro });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao abrir edição');
  }
};

export const update = async (req, res) => {
  try {
    const update = {
      placa: req.body.placa,
      modelo: req.body.modelo,
      marca: req.body.marca,
      ano: req.body.ano ? Number(req.body.ano) : undefined,
      diaria: req.body.diaria ? Number(req.body.diaria) : undefined,
      disponivel: req.body.disponivel === 'on' ? true : (req.body.disponivel === 'false' ? false : undefined)
    };
    // remove undefined fields so they don't overwrite existing values
    Object.keys(update).forEach(k => update[k] === undefined && delete update[k]);

    if (req.file) {
      update.imagem = req.file.buffer;
      update.imagemTipo = req.file.mimetype;
    }

    await Carro.findByIdAndUpdate(req.params.id, update);
    res.redirect('/carros');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar carro');
  }
};

export const remove = async (req, res) => {
  try {
    await Carro.findByIdAndDelete(req.params.id);
    res.redirect('/carros');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir carro');
  }
};

// rota utilitária para servir a imagem salva no MongoDB
export const imagem = async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id).select('imagem imagemTipo').lean();
    if (!carro || !carro.imagem) return res.status(404).end();
    res.contentType(carro.imagemTipo || 'image/jpeg');
    res.send(carro.imagem);
  } catch (err) {
    console.error('Erro ao servir imagem:', err);
    res.status(500).end();
  }
};

export const search = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.redirect('/carros');
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const carros = await Carro.find({
      $or: [
        { marca: regex },
        { modelo: regex },
        { placa: regex }
      ]
    }).lean();
    res.render('carro/list', { carros, q });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro na busca');
  }
};