import mongoose from 'mongoose';
const CarroSchema = new mongoose.Schema({
  placa: { type: String, required: true, unique: true },
  modelo: { type: String, required: true },
  marca: { type: String },
  ano: {
    type: Number,
    min: 1886,
    validate: {
      validator: v => v <= new Date().getFullYear(),
      message: 'Ano deve ser entre 1886 e o ano atual'
    }
  },
  diaria: { type: Number, required: true },
  disponivel: { type: Boolean, default: true },
  imagem: { type: Buffer },       // armazena imagem no MongoDB
  imagemTipo: { type: String }    // ex: 'image/jpeg'
}, { timestamps: true });

export default mongoose.model('Carro', CarroSchema);
