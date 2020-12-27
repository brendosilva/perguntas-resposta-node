const express = require('express');
const bodyParser = require('body-parser');
const conection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
require('dotenv').config();

//database

conection
    .authenticate()
    .then(() => {
        console.log('Conexão com sucesso');
    }).catch((err) => {
        console.log('Deu ruin parceiro.')
    })

const app = express();
const porta = 3333
// Indicando ao express que irá usar o ejs como renderizador html..
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Linkando o bodyParser ao express.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]}).then((perguntas) => {
        res.render('index', {
            perguntas: perguntas
        });         
    });  
    
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarPergunta',(req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined)
        {            
            Resposta.findAll({
                where: { perguntaId: pergunta.id  },
                order: [ ['id', 'DESC'] ]                
            }).then((respostas) => {
                res.render('pergunta', { pergunta: pergunta, respostas: respostas });
            })
        }
        else
        {
           res.redirect("/")
        }
    });
});

// Recebendo formulario de resposta

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+perguntaId);
    })
})

app.listen(porta, () => {
    console.log(process.env);
});