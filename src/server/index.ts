import express from 'express'
import path from 'path'
import config from './db/config'
import routes from './routers/index'
import db from './db/connector'

const app = express()
const port = config.port
const appPage = path.join(__dirname + '/public/index.html')

app.set('json spaces', 4)

app.get('/public/*', (req, res) => {
    res.sendFile(path.join(__dirname + req.url))
});

routes.init(app, db)

app.get('/', (req, res) => {
    res.sendFile(appPage)
})

app.listen(port, () => {
    console.log(`Server up on: http://localhost:${port}/`)
});