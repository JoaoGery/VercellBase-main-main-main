
 export default class GeralController {
 
    constructor() {
        this.home = async (req, res) => {
          res.render('index')
        };

        this.homesite= async (req, res) => {
          res.render('site/index');
        };

        this.formulario = async (req, res) => {
          res.render('index')
        };

    }
 }

