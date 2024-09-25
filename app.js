const express = require('express')
const app = express()
const { sequelize } = require('sequelize');
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const post = require("./models/user")
const port = 8080

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/cadastrar", (req, res) => {
    res.render('cadastro')
})

app.post("/cadastrar", async (req, res) => {
    try {
        post.create({
            nome: req.body.nome,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            cep: req.body.cep,
            cidade: req.body.cidade,
            estado: req.body.estado,
        }).then(() => {
            res.redirect("/consulta")
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})

app.get("/consulta", (req, res) => {
    post.findAll().then((posts) => {
        res.render("consulta", { posts: posts })
    }).catch((e) => {
        console.log("Erro: " + e)
    })
})

app.get("/editar/:id", (req, res) => {
    post.findAll({ sequelize: { "id": req.params.id } }).then((posts) => {
        res.render("editar", { posts: posts })
    }).catch(function (erro) {
        console.log("Erro ao editar os dados: " + erro)
    })
})

app.post("/atualizar", async (req, res) => {
   await post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
    }, { sequelize: { id: req.body.id } }).then(() => {
        res.redirect("/consulta")
    }).catch(function (erro) {
        res.send("Erro ao atualizar: " + erro)
    })
})

app.get('/excluir/:id', (req, res) => {
    post.destroy({ where: { "id": req.params.id } }).then(() => {
        res.redirect('/consulta')
    }).catch((err) => {
        console.error(err)
        res.send('Ocorreu um erro')
    })
})

app.listen(port, () => {
    console.log('Iniciando...');
})