import express, { Router } from 'express';
import { adaptRoute } from './adapters/express-route-adapter';
import { makeGetLatestNewsByCountryController } from './factories/get-latest-news-by-country-controller';
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const router = Router()

app.use('/api', router)

router.post('/get-latest-news-by-country', adaptRoute(makeGetLatestNewsByCountryController()))

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
