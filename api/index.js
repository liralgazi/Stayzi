const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonwebtkn = require('jsonwebtoken');
const User = require('./models/User.js');
const CookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jsonwebtknSecret = 'jvnfjkdxnvjk56gnfh4ffh5l'

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: '*',
    
}));

try{
//connecting to mongoDB 
mongoose.connect(process.env.MONGO_URL);
console.log('connected to db');
}catch (e) {console.log('connection to DB failed', e);}

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
    console.log('user registered successfully!');
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
                    res.cookie('token', token).json(userDoc);
                    console.log('user logged in successfully!');
                });
            }
            else{
                res.status(422).json('incorrect password');
                console.log('inccorect password');
                }
        }
        else{
            res.json('user not found');
            console.log('user not found');
        }
    }catch (e){
        console.log('error - could not log in');
    }
});

app.get('/profile', (req,res)=> {
    const {token} = req.cookies;
    //TO DO: check why the cookies doesnt transfer from the user 
    res.json({token});
});



app.listen(4000);
 