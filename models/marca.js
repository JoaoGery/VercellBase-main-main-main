import conexao from '../config/conexao.js'

const Marca = conexao.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    pais: {
        type: String,
        required: true,
        trim: true
    }
})

export default conexao.model('Marca', Marca)
