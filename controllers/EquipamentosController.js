import Equipamento from '../models/equipamento.js'

export default class EquipamentosController {

    constructor(caminhoBase = 'equipamento/') {
        this.caminhoBase = caminhoBase

        // abre a tela de adicionar
        this.openAdd = async (req, res) => {
            res.render(caminhoBase + "add")
        }

        // adiciona um novo equipamento
        this.add = async (req, res) => {
            try {
                await Equipamento.create({
                    nome: req.body.nome,
                    tipo: req.body.tipo,
                    marca: req.body.marca,
                    preco: req.body.preco,
                    ano: req.body.ano,
                    imagem: req.file ? req.file.buffer : undefined
                });
                res.redirect('/' + this.caminhoBase + 'lst');
            } catch (err) {
                console.error("Erro ao adicionar equipamento:", err);
                res.status(500).send("Erro ao adicionar equipamento");
            }
        }

        // lista todos os equipamentos
        this.list = async (req, res) => {
            try {
                const resultado = await Equipamento.find({});
                res.render(caminhoBase + 'lst', { Equipamentos: resultado });
            } catch (err) {
                console.error("Erro ao listar equipamentos:", err);
                res.status(500).send("Erro ao listar equipamentos");
            }
        }

        // pesquisa por nome
        this.find = async (req, res) => {
            try {
                const filtro = req.body.filtro || "";
                const resultado = await Equipamento.find({
                    nome: { $regex: filtro, $options: "i" }
                });
                res.render(caminhoBase + 'lst', { Equipamentos: resultado });
            } catch (err) {
                console.error("Erro ao buscar equipamentos:", err);
                res.status(500).send("Erro ao buscar equipamentos");
            }
        }

        // abre a tela de edição
        this.openEdt = async (req, res) => {
            try {
                const id = req.params.id;
                const equipamento = await Equipamento.findById(id);
                res.render(caminhoBase + "edt", { equipamento });
            } catch (err) {
                console.error("Erro ao abrir edição de equipamento:", err);
                res.status(500).send("Erro ao abrir edição");
            }
        }

        // edita um equipamento
        this.edt = async (req, res) => {
            try {
                const updateData = {
                    nome: req.body.nome,
                    tipo: req.body.tipo,
                    marca: req.body.marca,
                    preco: req.body.preco,
                    ano: req.body.ano
                };
                if (req.file) {
                    updateData.imagem = req.file.buffer;
                }
                await Equipamento.findByIdAndUpdate(req.params.id, updateData);
                res.redirect('/' + this.caminhoBase + 'lst');
            } catch (err) {
                console.error("Erro ao editar equipamento:", err);
                res.status(500).send("Erro ao editar equipamento");
            }
        }

        // deleta um equipamento
        this.del = async (req, res) => {
            try {
                await Equipamento.findByIdAndDelete(req.params.id);
                res.redirect('/' + this.caminhoBase + 'lst');
            } catch (err) {
                console.error("Erro ao excluir equipamento:", err);
                res.status(500).send("Erro ao excluir equipamento");
            }
        }
    }
}

