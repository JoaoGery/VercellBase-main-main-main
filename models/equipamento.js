import conexao from '../config/conexao.js'

const Equipamento = conexao.Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true,
        min: 0
    },
    ano: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },
    imagem: {
        type: Buffer // campo para armazenar dados binários (ex: imagem)
    }
})

export default conexao.model('Equipamento', Equipamento)
