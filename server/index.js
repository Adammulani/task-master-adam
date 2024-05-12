import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { usertRoute } from './routes/usertRoute.js';
import { taskRoute } from './routes/taskRoute.js';

dotenv.config();

const app=express();

const PORT=process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT,()=>{
    console.log(`server running on port no ${PORT}`)
})


app.use('/api/v1/usert',usertRoute)
app.use('/api/v1/task',taskRoute);




