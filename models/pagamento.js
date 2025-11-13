import mongoose from 'mongoose';

const pagamentoSchema = new mongoose.Schema({
  reservaId: String,
  valor: Number,
  dataPagamento: Date
});

export default mongoose.model('Pagamento', pagamentoSchema);
