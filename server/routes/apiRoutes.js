import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();

const configuration = new Configuration({
     apiKey: process.env.APIKEY,
})

const openai = new OpenAIApi(configuration);

router.get('/', (req, res) => {
     res.send('yo mate')
});

router.post('/', async (req, res) => {
     try {
          const { prompt } = req.body;

          const aiResponse = await openai.createImage({
               prompt: prompt,
               n: 1,
               size: "1024x1024",
             });
             image_url = aiResponse.data.data[0].url;
      
          const image = aiResponse.data.data[0].b64_json;
          res.status(200).json({ photo: image });
     } catch (error) {
          console.log(error);
          res.status(500).send(error?.response.data.error.message)
     }
})

export default router; 