import conexao from '../config/conexao.js'

const Curso = conexao.Schema({
    nome: {type:String, required:true},
    area:{type:String, required:true},
    anofundacao:{type:Number, required:true},
    nivel:{type:String, required:true}
})

export default conexao.model('Curso',Curso)