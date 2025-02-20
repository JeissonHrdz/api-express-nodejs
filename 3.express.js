const ditto = require('./pokemon/ditto.json')
const express = require('express')
const app = express()

app.disable('x-powered-by')
app.use((req, res, next) => {
  console.log('middleware')
  next()
})

const PORT = process.env.PORT ?? 1234

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

app.use((req, res) => {
  res.status(404).end('404')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
