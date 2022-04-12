// Importa o módulo do HTTP
const http = require('http');

// Cria um servidor e atribui uma callback de processamento da requisição
const server = http.createServer((req, res) => {
  res.statusCode = 200; // Retorno OK
  res.setHeader('Content-Type', 'text/html'); 
  res.end('Hello Diego');
});

// Define parâmetros (hostname e porta) e inicia o servidor
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(` Servidor rodando http://${hostname}:${port}/`);
});