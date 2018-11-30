const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
var Dictionary = require('oxford-dictionary-api')

app.use(express.static(path.join(__dirname, './client/build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.post('/test', (req, res) => {
//     console.log(req.body);
// })

var app_id = "50f3da34"
var app_key = "6c5c8f2126841ca1200443c8a1cd6142"
var dict = new Dictionary(app_id, app_key)

app.post('/definition',() => {
    dict.find(req.body.elklmeh, function(error, data){
        if(error){
            res.sendStatus(400)
        }else{
            res.send(data)
        }
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, './client/build/index.html')))
});

const port = 3500;
app.listen(port, () => {
    console.log(`this is the port : ${port}`)
});