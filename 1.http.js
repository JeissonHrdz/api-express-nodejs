const http = require('node:http')
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end('Bienvenido a mi pagina de inicio')
  } else if (req.url === '/imagen-super-bonita.png') {
    fs.readFile('./imagen.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Error interno del servidor')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('Contatos de mi pagina')
  } else {
    res.statusCode = 404
    res.end('Pagina no encontrada')
  }
}
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
