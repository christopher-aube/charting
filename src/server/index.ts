import express from "express";
import path from "path";

const app = express();
const port = 8080;
const appPage = path.join(__dirname + '/public/index.html');

app.set('json spaces', 4);

app.get('/public/*', (req, res) => {
    res.sendFile(path.join(__dirname + req.url));
});

app.get('/', (req, res) => {
    res.sendFile(appPage);
})

app.listen(port, () => {
    console.log(`Server up on: http://localhost:${port}/`);
});