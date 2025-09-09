import conexao from '../config/conexao.js'

const Jogo = conexao.Schema({
    nome: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        enum: ['MOBA', 'FPS', 'BATTLE ROYALE'],
        required: true
    },
    desenvolvedor: {
        type: String,
        required: true
    },
    classificacao: {
        type: String,
        required: true
    },
    plataforma: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
})

export default conexao.model('Jogo', Jogo)