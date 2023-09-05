import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import morgan from 'morgan';
const app = express();
import userRoutes from './Routes/userRoutes.js'

app.use(cors({origin:["http://localhost:5173"], credentials:true}))
app.use(morgan("dev"))
app.use(express.json({limit:"50mb", extended:true}))
app.use(express.urlencoded({limit:"50mb", extended:true}))
app.use(cookieParser());
dotenv.config(); 

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
   console.log("connected to the database");
})
.catch((err)=> console.log("error connecting to the database"))

const PORT = 5000; 

app.listen(PORT, ()=>console.log("listening to the port"))

app.use('/', userRoutes)
