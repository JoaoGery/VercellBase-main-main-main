import conexao from '../config/conexao.js'

const Aluno = conexao.Schema({
    nome: {type:String, required:true},
    matricula:{type:String, required:true}
})

export default conexao.model('Aluno',Aluno)