import mongoose from 'mongoose';
import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/generate', apiRoutes);

app.get('/', async (req,res) => {
  res.send('yo yo yo')
})

const runServer = () => {
      try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.DBURL)
        .then(() => console.log('Database Engaged'))
        app.listen(process.env.PORT);
        console.log(`running on http://localhost:${process.env.PORT}`)
      } catch (error) {
        console.error('Database Failure!');
        console.error(err);       
      }
  };

runServer();