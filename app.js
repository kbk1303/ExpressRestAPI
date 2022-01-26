const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/enroll', function (req, res) {
    const user_name = req.body.userName;
    const password = req.body.password
    console.log('user_name and password', 'userName: '+user_name + ' Password: ' + password)

    res.send({'userName': user_name, 'Password': password})
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})