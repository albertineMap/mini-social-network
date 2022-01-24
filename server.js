const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({
    path:'./config/.env'
})
require('./config/db')
const app= express();
const userRoutes = require('./routes/user.routes');

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//route
app.use('/api/user',userRoutes);

//server
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})