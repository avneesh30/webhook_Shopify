import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/webhooks/orders/create', (req, res) => {
  console.log('🎉 We got an order!')
  res.send('🎉 We got an order!');
  // res.sendStatus(200)
})

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
