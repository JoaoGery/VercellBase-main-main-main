// importar os Models
import Torneio from '../models/torneio.js'
import Jogos from '../models/jogo.js'

export default class TorneiosController {

    constructor(caminhoBase = 'torneio/') {
        this.caminhoBase = caminhoBase

        // 👉 Abrir tela de adicionar torneio
        this.openAdd = async (req, res) => {
            const jogos = await Jogos.find({})
            res.render(caminhoBase + "add", { jogos })
        }

        // 👉 Adicionar torneio
        this.add = async (req, res) => {
            await Torneio.create({
                nome: req.body.nome,
                jogo: req.body.jogo, // deve ser o _id do jogo
                periodo: {
                    dataInicio: new Date(req.body.dataInicio),
                    dataFim: new Date(req.body.dataFim)
                },
                premiacao: parseFloat(req.body.premiacao),
                status: req.body.status
            })
            res.redirect('/' + this.caminhoBase + 'add')
        }

        // 👉 Listar todos os torneios
        this.list = async (req, res) => {
            const resultado = await Torneio.find({}).populate('jogo')
            res.render(caminhoBase + 'lst', { Torneios: resultado })
        }

        // 👉 Buscar torneio por nome (filtro)
        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await Torneio.find({
                nome: { $regex: filtro, $options: "i" }
            }).populate('jogo')
            res.render(caminhoBase + 'lst', { Torneios: resultado })
        }

        // 👉 Abrir tela de edição de torneio
        this.openEdt = async (req, res) => {
            const id = req.params.id
            const torneio = await Torneio.findById(id)
            const jogos = await Jogos.find({})
            res.render(caminhoBase + "edt", { torneio, jogos })
        }

        // 👉 Editar torneio
        this.edt = async (req, res) => {
            await Torneio.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                jogo: req.body.jogo, // ID do jogo
                periodo: {
                    dataInicio: new Date(req.body.dataInicio),
                    dataFim: new Date(req.body.dataFim)
                },
                premiacao: parseFloat(req.body.premiacao),
                status: req.body.status
            })
            res.redirect('/' + this.caminhoBase + 'lst')
        }

        // 👉 Deletar torneio
        this.del = async (req, res) => {
            await Torneio.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst')
        }
    }
}
