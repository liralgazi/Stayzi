const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();

require('dotenv').config()

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: '*',
    
}));

console.log(process.env.MONGO_URL)
console.log('here')

//connecting to mongoDB 
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
    res.json('test ok')
});

app.post('/signup', (req,res) => { 
    const {name, email, password} = req.body;
    res.json({name, email, password});
});


app.listen(4000);
 