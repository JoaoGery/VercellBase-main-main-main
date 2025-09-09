// importar o Model
import Jogo from '../models/jogo.js'

export default class JogosController {

    constructor(caminhoBase = 'jogo/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async (req, res) => {
            res.render(caminhoBase + "add")
        }

        this.add = async (req, res) => {
            // cria o Jogo com todos os campos necessários
            await Jogo.create({
                nome: req.body.nome,
                ano: req.body.ano,
                genero: req.body.genero,
                desenvolvedor: req.body.desenvolvedor,
                classificacao: req.body.classificacao,
                plataforma: req.body.plataforma,
                preco: req.body.preco
            });
            res.redirect('/' + this.caminhoBase + 'add');
        }

        this.list = async (req, res) => {
            const resultado = await Jogo.find({})
            res.render(caminhoBase + 'lst', { Jogos: resultado })
        }

        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await Jogo.find({
                nome: { $regex: filtro, $options: "i" }
            })
            res.render(caminhoBase + 'lst', { Jogos: resultado })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const jogo = await Jogo.findById(id)
            res.render(caminhoBase + "edt", { jogo })
        }

        this.edt = async (req, res) => {
            await Jogo.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                ano: req.body.ano,
                genero: req.body.genero,
                desenvolvedor: req.body.desenvolvedor,
                classificacao: req.body.classificacao,
                plataforma: req.body.plataforma,
                preco: req.body.preco
            })
            res.redirect('/' + this.caminhoBase + 'lst');
        }

        this.del = async (req, res) => {
            await Jogo.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst');
        }
    }
}