//importar o Model
import Genero from '../models/genero.js'

export default class GenerosController {

    constructor(caminhoBase = 'genero/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async (req, res) => {
            res.render(caminhoBase + "add")
        }

        this.add = async (req, res) => {
            // cria o Gênero
            await Genero.create({
                nome: req.body.nome
            });
            res.redirect('/' + this.caminhoBase + 'add');
        }

        this.list = async (req, res) => {
            const resultado = await Genero.find({})
            res.render(caminhoBase + 'lst', { Generos: resultado })
        }

        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await Genero.find({
                nome: { $regex: filtro, $options: "i" }
            })
            res.render(caminhoBase + 'lst', { Generos: resultado })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const genero = await Genero.findById(id)
            res.render(caminhoBase + "edt", { genero })
        }

        this.edt = async (req, res) => {
            await Genero.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/' + this.caminhoBase + 'lst');
        }

        this.del = async (req, res) => {
            await Genero.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst');
        }
    }
}