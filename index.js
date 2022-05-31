const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');

 app.use(cors())
 app.use(express.json())
app.get('/', (req, res) => {
  res.send('car part shop home router')
})

app.listen(port, () => {
  console.log(` Carts parts shop ${port}`)
})