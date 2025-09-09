import conexao from '../config/conexao.js'

const Genero = conexao.Schema({
    nome: {
        type: String,
        enum: ['MOBA', 'FPS', 'BATTLE ROYALE'],
        required: true
    }
})

export default conexao.model('Genero',Genero)