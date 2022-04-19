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

const lista_produtos = {
  produtos: [
      { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
      { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
      { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
      { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
      { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
  ]
}

app.use ('/site', express.static('site', {index: ['app.html', 'index.html']}))

app.options ('/produtos/:id', cors())
app.get('/produtos', (req,res, next) => {
  res.status(200).json (lista_produtos);
})

app.get ('/produtos/:id', (req, res, next) => {
  let id = parseInt(req.params.id)
  let idx = lista_produtos.produtos.findIndex((elem) => elem.id == id)
  
    if (id && (idx > -1)) {
        res.status(200).json (lista_produtos.produtos[idx])
    }
    else {
        res.status(404).json ({message: "Produto não encontrado"})
    }
    
})

app.post('/produtos', express.json(), (req,res,next) => {
  const maxId = lista_produtos.produtos.reduce((prev, current) => {
    return (prev.id > current.id) ? prev : current.id
    })
  let produto = req.body
  produto.id = maxId + 1
  lista_produtos.produtos.push(produto)
  res.status(201).send("Produto inserido")
})

app.put('/produtos/:id', (req,res,next) => {
  let id = parseInt(req.params.id)
  let idx = lista_produtos.produtos.findIndex((elem) => elem.id == id)
  
    if (id && (idx > -1)) {
      let produto = req.body
      produto.id = id
      lista_produtos.produtos[idx] = produto
        res.status(200).json ({message: "Produto atualizado"})
    }
    else {
        res.status(404).json ({message: "Produto não encontrado"})
    }
})

app.delete('/produtos/:id', (req,res,next) => {
  let id = parseInt(req.params.id)
  let idx = lista_produtos.produtos.findIndex((elem) => elem.id == id)
  
    if (id && (idx > -1)) {
      lista_produtos.produtos.pop(idx)
      res.status(200).json ({message: "Produto excluído"})
    }
    else {
        res.status(404).json ({message: "Produto não encontrado"})
    }
})

app.use ((req, res) => {
    res.status (404).send ('Recurso não existente')
})

port = process.env.PORT || 3000
app.listen (port, () => {
    console.log (`servidor rodando em http://localhost:${port}`)
})