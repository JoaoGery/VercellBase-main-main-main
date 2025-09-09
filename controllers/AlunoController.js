//importar o Model
import Aluno from '../models/aluno.js'

export default class AlunoController{

    constructor(caminhoBase='aluno/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Aluno
           
            await Aluno.create({
                nome: req.body.nome,
                matricula:req.body.matricula
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Aluno.find({})
            res.render(caminhoBase + 'lst', {Alunos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Aluno.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Alunos:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const aluno = await Aluno.findById(id) 
            console.log(aluno)
            res.render(caminhoBase + "edt", 
                {Aluno:aluno})
        }


        this.edt = async(req, res)=>{
        await Aluno.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Aluno.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}