const jsonServer = require('json-server')
const clone = require('clone')
const data = require('./db.json')
const cors = require('cors')

const isProductionEnv = process.env.NODE_ENV === 'production';
const server = jsonServer.create()

// For mocking the POST request, POST request won't make any changes to the DB in production environment
const fs = require('fs')


const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(cors())
server.use((req, res, next) => {
    if (req.path !== '/')
        router.db.setState(clone(data))
    next()
})

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))
const router = jsonServer.router(db)
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

server.use(router)
server.listen(process.env.PORT || 8000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server