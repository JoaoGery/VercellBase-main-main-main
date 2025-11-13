import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String
});

export default mongoose.model('Cliente', clienteSchema);
