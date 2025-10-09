import Marca from '../models/marca.js'

export default class MarcasController {

    constructor(caminhoBase = 'marca/') {
        this.caminhoBase = caminhoBase

        // Abre a tela de cadastro
        this.openAdd = async (req, res) => {
            res.render(caminhoBase + "add")
        }

        // Cadastra a marca
        this.add = async (req, res) => {
            await Marca.create({
                nome: req.body.nome,
                pais: req.body.pais,
                imagem: req.file ? req.file.buffer : undefined
            })
            res.redirect('/' + this.caminhoBase + 'lst')
        }

        // Lista todas as marcas
        this.list = async (req, res) => {
            const resultado = await Marca.find({})
            res.render(caminhoBase + 'lst', { Marcas: resultado })
        }

        // Pesquisa (filtro por nome ou país)
        this.find = async (req, res) => {
            const filtro = req.body.filtro
            const resultado = await Marca.find({
                $or: [
                    { nome: { $regex: filtro, $options: "i" } },
                    { pais: { $regex: filtro, $options: "i" } }
                ]
            })
            res.render(caminhoBase + 'lst', { Marcas: resultado })
        }

        // Abre a tela de edição
        this.openEdt = async (req, res) => {
            const id = req.params.id
            const marca = await Marca.findById(id)
            res.render(caminhoBase + "edt", { marca })
        }

        // Edita a marca
        this.edt = async (req, res) => {
            const updateData = {
                nome: req.body.nome,
                pais: req.body.pais
            }
            if (req.file) {
                updateData.imagem = req.file.buffer
            }
            await Marca.findByIdAndUpdate(req.params.id, updateData)
            res.redirect('/' + this.caminhoBase + 'lst')
        }

        // Deleta a marca
        this.del = async (req, res) => {
            await Marca.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst')
        }
    }
}
