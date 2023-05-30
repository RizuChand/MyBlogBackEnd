const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./model/User')
const app = express();
const port = 4000;
const dbConne = require('./config/DbConne')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());

dbConne();

const salt = bcrypt.genSaltSync(10);
const secret = "inirahasiabakayaro"

app.post('/register', async  (req, res) => {
  const {username, password} = req.body;
  
  try {
  const useDoc = await user.create({
     username, password:bcrypt.hashSync(password,salt)
   })
  res.json(useDoc);
    
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }

})

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  try {
    const useDoc = await user.findOne({username});
    const pass = bcrypt.compareSync(password, useDoc.password);

    if (pass) {
      
      jwt.sign({username, id:useDoc._id}, secret, {} ,(err,token)=>{

        if(err) throw err;

        res.cookie('token', token).json("oke token masuk");

      })

    }else {
      res.status(404).json("that wrong password")
    }

  } catch (err) {
    console.log(err);
    
  }
})

mongoose.connection.once('open', ()=>{
  console.log("Connected to MongoDb");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
