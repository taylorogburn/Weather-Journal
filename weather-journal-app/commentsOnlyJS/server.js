const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('../website'));

const port = 8000;
const server = app.listen(port, listening);
function listening (){
    console.log('server is running')
    console.log(`running on localhost:${port}`)
};

projectData = {};

//get route
app.get('/getData', getData);
function getData (req, res){
     res.sendFile('index.html', { root: '../website/' });
     res.send(projectData);
};

const data = [];

//post route
app.post('/addweather', addWeather);
function addWeather (req, res){
    const newEntry = {
        date: req.body.date,
        temperature: req.body.temp,
        weather: req.body.weather,
        content: req.body.content,
        city: req.body.city,
    }
    Object.assign(projectData, newEntry);
    res.send(projectData);
    console.log(projectData)
};