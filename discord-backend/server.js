const express=require('express');
const http=require('http');
const cors=require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes=require('./routes/authRoutes');
const PORT= process.env.PORT || process.env.API_PORT||8081;
const app=express();
app.use(express.json());
app.use(cors());

//register the routes
app.use('/api/auth',authRoutes);

const server=http.createServer(app);


mongoose.connect(process.env.MONGO_URL)
.then(()=> {
server.listen(PORT,()=> {
    console.log(`CHal raha hai bhai ${PORT}`);
});
})
.catch((err)=> {
    console.log("connection failed DATABASE HEHEhEHE");
    console.log(err);
})