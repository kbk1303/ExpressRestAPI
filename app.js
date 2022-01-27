const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const array = new Array(
  
  {
    "name": "Russia",
    "flag": "f/f3/Flag_of_Russia.svg",
    "area": 17075200,
    "population": 146989754
  },
  {
    "name": "France",
    "flag": "c/c3/Flag_of_France.svg",
    "area": 640679,
    "population": 64979548
  },
  {
    "name": "Germany",
    "flag": "b/ba/Flag_of_Germany.svg",
    "area": 357114,
    "population": 82114224
  },
  {
    "name": "Canada",
    "flag": "c/cf/Flag_of_Canada.svg",
    "area": 9976140,
    "population": 36624199
  },
  {
    "name": "Vietnam",
    "flag": "2/21/Flag_of_Vietnam.svg",
    "area": 331212,
    "population": 95540800
  },
  {
    "name": "Mexico",
    "flag": "f/fc/Flag_of_Mexico.svg",
    "area": 1964375,
    "population": 129163276
  },
  {
    "name": "United States",
    "flag": "a/a4/Flag_of_the_United_States.svg",
    "area": 9629091,
    "population": 324459463
  },
  {
    "name": "India",
    "flag": "b/b7/Flag_of_Europe.svg",
    "area": 3287263,
    "population": 1324171354
  },
  {
      "name": "Denmark",
      "flag": "9/9c/Flag_of_Denmark.svg",
      "area": 332445,
      "population": 6878787
  }
  
)

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
    array.push({userName: user_name, Password: password})
    console.log(JSON.stringify(array))
    res.send({'userName': user_name, 'Password': password})
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})