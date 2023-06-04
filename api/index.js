const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: '*',
    
}));

app.get('/test', (req,res) => {
    res.json('test ok')
});


app.post('/signup', (req,res) => { 
    const {name, email, password} = req.body;
    res.json({name, email, password});
});


app.listen(4000);
 