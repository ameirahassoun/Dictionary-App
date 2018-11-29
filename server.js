const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './client/build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, './client/build/index.html')))
});

const port = 3500;
app.listen(port, () => {
    console.log(`this is the port : ${port}`)
});