const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const WebSocket = require('ws');
const { readFileSync } = require('fs');
const jsonArray = require('./countries.json');
const array = [];
for(var i in jsonArray)
  array.push(jsonArray[i]);
//console.log("JSON", jsonArray);
//console.log("array", array);
const wss = new WebSocket.Server({port: 7071});

const clients = new Map();

wss.on('connection', (ws) => {
  console.log("connected");
  const id = uuidv4();
  //const color = Math.floor(Math.random() * 360);


  setInterval(()=> {
    const country = array[Math.floor(Math.random() * array.length)];
    //console.log("rand country", country);
    const metadata = {id,  country};
    const message = metadata;

    clients.set(ws, metadata);
    
    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((client) => {
      client.send(outbound);
    });
  },Math.round(Math.random() * (6000 - 500)) + 500)

  ws.on('message', (messageAsString) => {
    const message = JSON.parse(messageAsString);
    const metadata = clients.get(ws);

    message.sender = metadata.id;
    message.color = metadata.color;

    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((client) => {
      client.send(outbound);
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

function uuidv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});
}


console.log("wss up");


const userArray = new Array();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/all/countries', (req, res) => {
  //console.log("data", array)
  res.send(array);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.delete('/country/:id', (req, res) => {
  console.log('delete called...'+req.params.id)
  array.splice(req.params.id, 1)
  res.send(array.splice(req.params.id, 0))
})

app.post('/enroll/country', function (req, res) {
  const name = req.body.name;
  const flag = req.body.flag;
  const area = req.body.area;
  const population = req.body.population;
  //console.log('user_name and password', 'userName: '+user_name + ' Password: ' + password)
  array.push({name: name, flag: flag, area: area, population:population})
  console.log(JSON.stringify(array))
  res.send({'name': name, 'flag': flag, 'area': area, 'population':population})
})

app.post('/enroll', function (req, res) {
    const user_name = req.body.userName;
    const password = req.body.password
    //console.log('user_name and password', 'userName: '+user_name + ' Password: ' + password)
    userArray.push({userName: user_name, Password: password})
    console.log(JSON.stringify(userArray))
    res.send({'userName': user_name, 'Password': password})
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})