const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonwebtkn = require('jsonwebtoken');
const User = require('./models/User.js');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jsonwebtknSecret = 'jvnfjkdxnvjk56gnfh4ffh5l'

app.use(express.json()); 
app.use(cors({
    credentials: true,
    origin: '*',
    
}));

//connecting to mongoDB 
mongoose.connect(process.env.MONGO_URL);

app.get('/test', async (req,res) => {
    res.json('test ok')
});

//registeration 
app.post('/signup',  async (req,res) => { 
    const {name, email, password} = req.body;
    try{
    const userDoc  = await User.create({
        name,
        email,
        //encrypt the password
        password: bcrypt.hashSync(password, bcryptSalt) ,
   });
    res.json(userDoc);
    //if there is duplication 
} catch(e) {res.status(422).json(e);}
});


//login
app.post('/login', async(req,res)=>{
    try{
        const {email, password} = req.body;
        //search for the email in DB
        const userDoc = await User.findOne({email:email})
        if (userDoc){
            //validate password
            const validatedPass = bcrypt.compareSync(password, userDoc.password);
            if (validatedPass){
                //create json web token
                jsonwebtkn.sign({email: userDoc.email, id:userDoc._id},jsonwebtknSecret, {}, (err, token)=> {
                    if (err) throw err;
                    res.cookie('token', token).json('user validated');
                });
            }
            else{
                res.status(422).json('incorrect password');
                }
        }
        else{
            res.json('user not found');
        }
    }catch (e){}
});



app.listen(4000);
 