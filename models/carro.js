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
  imagem: { type: Buffer },       
  imagemTipo: { type: String }   
}, { timestamps: true });

export default mongoose.model('Carro', CarroSchema);
