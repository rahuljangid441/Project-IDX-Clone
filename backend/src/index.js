import express from 'express';
import cors from 'cors';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api' , apiRouter);


app.get('/ping' , (req , res)=>{
    return res.status(200).json({
        message : 'Pong',
        success : true
    });
})

app.listen(PORT , ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
