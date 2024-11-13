const express=require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT;
require('./config/db')
const cors=require('cors');
app.use(cors());
app.use(express.json());
const morgan=require('morgan');
app.use(morgan('dev'))
const otpRoutes=require('./routes/otpRoutes');
app.use('/user',otpRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})