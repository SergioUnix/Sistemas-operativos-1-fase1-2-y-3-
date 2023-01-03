const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/enviarLoadBalancer', (req, res) => {
  res.send('oki')

  //recibe lo que envian en la varible obj y se parsea
  const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
  console.log(obj); // { title: 'product' }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
