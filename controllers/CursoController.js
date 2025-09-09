//importar o Model
import Curso from '../models/curso.js'

export default class CursoController{

    constructor(caminhoBase='curso/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Curso
           
            await Curso.create({
                nome: req.body.nome,
                nivel:req.body.nivel,
                area:req.body.area,
                anofundacao:req.body.ano
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Curso.find({})
            res.render(caminhoBase + 'lst', {Cursos:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const aluno = 
            res.render(caminhoBase + "edt")
        }

        

    }
}