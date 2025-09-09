import conexao from '../config/conexao.js'

const Torneio = conexao.Schema({
    nome: {
        type: String,
        required: true
    },
    jogo: {
    type: String, // <-- agora é texto livre
    required: true
  },

    periodo: {
        dataInicio: {
            type: Date,
            required: true
        },
        dataFim: {
            type: Date,
            required: true
        }
    },
    premiacao: {
        type: Number,   // mudou para Number
        required: true
    },
    status: {
        type: String,
        enum: ['Aberto', 'Em andamento', 'Finalizado'],
        required: true
    }
})

export default conexao.model('Torneio', Torneio)
