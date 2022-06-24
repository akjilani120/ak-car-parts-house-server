const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
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
  const lamborghiniCarcollection = client.db("carHouse").collection("lamborghini");
  const bugattiCarcollection = client.db("carHouse").collection("bugatti");
  const bmwCarcollection = client.db("carHouse").collection("bmw");
  const userCarcollection = client.db("carHouse").collection("user");
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
  app.get("/lamborghini" , async(req , res) =>{
    const result = await lamborghiniCarcollection.find().toArray()
    res.send(result)
  })
  app.get("/bugatti" , async(req , res) =>{
    const result = await bugattiCarcollection.find().toArray()
    res.send(result)
  })
  app.get("/bmw" , async(req , res) =>{
    const result = await bmwCarcollection.find().toArray()
    res.send(result)
  })
  app.put("/user/:email", async(req , res) =>{
   const email = req.params.email
   const user = req.body  
   const filter ={ email}
   const options = { upsert: true };
   const updateDoc = {
    $set: user
  };
  const result = await userCarcollection.updateOne(filter, updateDoc, options);
  const token = jwt.sign({email}, process.env.ACCESS_SECERTE_PIN);
  res.send({token , result})

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