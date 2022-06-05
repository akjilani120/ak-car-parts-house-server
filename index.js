const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
 app.use(cors())
 app.use(express.json())
 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5pf8i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  
try{
  await client.connect();
  const populerCarcollection = client.db("carHouse").collection("populerCar");
  const specialCarcollection = client.db("carHouse").collection("specialCar");
  const offerCarcollection = client.db("carHouse").collection("offerCar");
  app.get("/populerCar" , async(req , res) =>{
    const result = await populerCarcollection.find().toArray()
    res.send(result)
  })
  app.get("/specialCar" , async(req , res) =>{
    const result = await specialCarcollection.find().toArray()
    res.send(result)
  })
  app.get("/offerCar" , async(req , res) =>{
    const result = await offerCarcollection.find().toArray()
    res.send(result)
  })
  
}finally{

}
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('car part shop home router')
})

app.listen(port, () => {
  console.log(` Carts parts shop ${port}`)
})