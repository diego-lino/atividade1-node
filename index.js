const express = require ('express')
const app = express ()
const morgan = require ('morgan')
const cors = require ('cors')

// Processa body para Content-Type application/json e atribui a req.body
app.use (express.json())        

// Processa body para Content-Type application/x-www-form-urlencoded e atribui a req.body
app.use (express.urlencoded())  

// Log do app
app.use (morgan ('common'))

app.use ('/site', express.static('site', {index: ['app.html', 'index.html']}))

app.options ('/produtos/:id', cors())
app.get ('/produtos/:id', (req, res, next) => {
    if (req.accepts('text/html')) {
        res.send ('<h1>Hello: ' + req.body.nome + '</h1>')    
    }
    else if (req.accepts ('application/json')) {
        res.json ({ message: 'Boas vindas', user: req.body.nome })
    }
    else {
        res.send ('Hello: ' + req.body.nome)
    }
    
})

app.use ((req, res) => {
    res.status (404).send ('Recurso não existente')
})

port = process.env.PORT || 3000
app.listen (port, () => {
    console.log (`servidor rodando em http://localhost:${port}`)
})