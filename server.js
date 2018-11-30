const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const Dictionary = require('oxford-dictionary-api');

app.use(express.static(path.join(__dirname, './client/build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const app_id = "50f3da34"
const app_key = "6c5c8f2126841ca1200443c8a1cd6142"
const dict = new Dictionary(app_id, app_key)

app.post('/definition', (req, res) => {
    const { e } = req.body;
    dict.find(e, (error, data) => {
        if(error){
            res.sendStatus(400);
        }
        res.send(data);
    })
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, './client/build/index.html')))
});

const port = 3500;
app.listen(port, () => {
    console.log(`this is the port : ${port}`)
});