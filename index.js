const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const jwt = require('jsonwebtoken');
 app.use(cors())
 app.use(express.json())
 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5pf8i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
function verifyJWT (req , res , next){
  const authorizationHead = req.headers.authorization
  
 if(!authorizationHead){
  return res.status(401).send({ message: "Unauthorization access" })
 }
 const token = authorizationHead.split(" ")[1] 

  jwt.verify(token, process.env.ACCESS_SECERTE_PIN, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Fobidden access" })
    }
    req.decoded = decoded;
    next()
  });
}

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
  const orderCarcollection = client.db("carHouse").collection("order");
  app.get("/populerCar" , async(req , res) =>{
    const result = await populerCarcollection.find().toArray()
    res.send(result)
  })
  app.post("/populerCar"   , async(req , res) =>{
   const query = req.body   
   const result = await populerCarcollection.insertOne(query)
   res.send(result)
  })
  app.get('/populerCar/:id' , async (req , res) =>{
    const id = req.params.id;   
    const query = { _id: ObjectId(id) }
    const result = await populerCarcollection.findOne(query)    
    res.send(result)
  })
  app.get("/specialCar" , async(req , res) =>{
    const result = await specialCarcollection.find().toArray()
    res.send(result)
  })
  app.get('/specialCar/:id' , async (req , res) =>{
    const id = req.params.id;   
    const query = { _id: ObjectId(id) }
    const result = await specialCarcollection.findOne(query)    
    res.send(result)
  })
  app.post("/specialCar"   , async(req , res) =>{
    const query = req.body   
    const result = await specialCarcollection.insertOne(query)
    res.send(result)
   })
  app.get("/offerCar" , async(req , res) =>{
    const result = await offerCarcollection.find().toArray()
    res.send(result)
  })
  app.get('/offerCar/:id' , async (req , res) =>{
    const id = req.params.id;   
    const query = { _id: ObjectId(id) }
    const result = await offerCarcollection.findOne(query)    
    res.send(result)
  })
 
  app.get("/lamborghini" , async(req , res) =>{
    const result = await lamborghiniCarcollection.find().toArray()
    res.send(result)
  })
  app.get('/lamborghini/:id' , async (req , res) =>{
    const id = req.params.id;   
    const query = { _id: ObjectId(id) }
    const result = await lamborghiniCarcollection.findOne(query)    
    res.send(result)
  })
  app.get('/bmw/:id' , async (req , res) =>{
    const id = req.params.id;   
    const query = { _id: ObjectId(id) }
    const result = await bmwCarcollection.findOne(query)    
    res.send(result)
  })
  app.get('/bugatti/:id' , async (req , res) =>{
    const id = req.params.id;   
    const query = { _id: ObjectId(id) }
    const result = await bugattiCarcollection.findOne(query)    
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
  // User part page
  app.put("/user/:email",   async(req , res) =>{
   const email = req.params.email     
   
   const filter ={ email}
   const user =  req.body
   const options = { upsert: true };
   const updateDoc = {
    $set: user
  };
  const result = await userCarcollection.updateOne(filter, updateDoc, options);
  res.send(result)
  })


  //make admin
  app.put("/user/admin/:email",   async(req , res) =>{
    const email = req.params.email  
    const filter ={ email}
    const updateDoc = {
     $set: {
      role:'admin'
     }
   };
   const result = await userCarcollection.updateOne(filter, updateDoc);
   res.send(result)
   })
   //get admin
app.get('/admin/:email', async (req,res)=>{
  const email= req.params.email;
  const user = await userCarcollection.findOne({email})
  if(user.role){
   return  res.send({isadmin: true})
  }else {
    return res.send({isadmin:false})
  }
})
// All order add
  app.post('/orders' , async(req , res) =>{
    const order = req.body   
    const result = await orderCarcollection.insertOne(order)
    res.send(result)
  })
  app.get('/allOrders' , async(req , res) =>{
    const result = await orderCarcollection.find().toArray()
    res.send(result)
  })
  app.get("/myOrders",   async (req , res)=>{
    const email = req.query.email    
   const query= { email : email}
   const result = await orderCarcollection.find(query).toArray()
   res.send(result)
  })
  app.delete("/myOrders/:id" , async (req ,res) =>{
    const id = req.params.id
    const query = {_id : ObjectId(id)}
    const result = await orderCarcollection.deleteOne(query)
    res.send(result)
  })
  app.put("/specialCar/:id"  , async(req , res) =>{
    const id = req.params.id;    
    const filter={_id: ObjectId(id) }
    const comment = req.body     
    const options = { upsert: true };
    const updateDoc = {
     $set: comment
   };
   const result = await specialCarcollection.updateOne(filter , updateDoc, options )
   res.send(result)
  })
  app.put("/populerCar/:id"  , async(req , res) =>{
    const id = req.params.id;    
    const filter={_id: ObjectId(id) }
    const comment = req.body     
    const options = { upsert: true };
    const updateDoc = {
     $set: comment
   };
   const result = await populerCarcollection.updateOne(filter , updateDoc, options )
   res.send(result)
  })
  app.put("/offerCar/:id" , async(req , res) =>{
    const id = req.params.id;    
    const filter={_id: ObjectId(id) }
    const comment = req.body     
    const options = { upsert: true };
    const updateDoc = {
     $set: comment
   };
   const result = await offerCarcollection.updateOne(filter , updateDoc, options )
   res.send(result)
  })
  app.put("/lamborghini/:id" , async(req , res) =>{
    const id = req.params.id;    
    const filter={_id: ObjectId(id) }
    const comment = req.body     
    const options = { upsert: true };
    const updateDoc = {
     $set: comment
   };
   const result = await lamborghiniCarcollection.updateOne(filter , updateDoc, options )
   res.send(result)
  })
  app.put("/bmw/:id" , async(req , res) =>{
    const id = req.params.id;    
    const filter={_id: ObjectId(id) }
    const comment = req.body     
    const options = { upsert: true };
    const updateDoc = {
     $set: comment
   };
   const result = await bmwCarcollection.updateOne(filter , updateDoc, options )
   res.send(result)
  })
  app.put("/bugatti/:id" , async(req , res) =>{
    const id = req.params.id;    
    const filter={_id: ObjectId(id) }
    const comment = req.body     
    const options = { upsert: true };
    const updateDoc = {
     $set: comment
   };
   const result = await bugattiCarcollection.updateOne(filter , updateDoc, options )
   res.send(result)
  })
  app.get("/users" , async(req , res) =>{
    const result = await userCarcollection.find().toArray()
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