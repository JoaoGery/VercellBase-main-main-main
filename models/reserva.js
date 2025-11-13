import mongoose from 'mongoose';

const ReservaSchema = new mongoose.Schema({
  carro: { type: mongoose.Schema.Types.ObjectId, ref: 'Carro', required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  inicio: { type: Date, required: true },
  fim: { type: Date, required: true },
  valorTotal: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['reservado', 'em_andamento', 'finalizado', 'cancelado'], default: 'reservado' }
}, { timestamps: true });

export default mongoose.model('Reserva', ReservaSchema);
