const express = require('express');
const cors = require('cors');
const app = express();


// Add Access Control Allow Origin headers
//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
//header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');


// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });



app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
    
}));

app.get('/test', (req,res) => {
    res.json('test ok')
});

/*
app.post('/signup', (req,res) =>{
    const {name, email, password} = req.body;
    res.json({name, email, password});
});
*/

app.listen(4000);
 