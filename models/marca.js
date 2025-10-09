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
    },
    imagem: {
        type: Buffer // campo para armazenar dados binários (ex: imagem)
    }
})

export default conexao.model('Marca', Marca)
