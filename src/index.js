import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const secretKey = '28d9ba24dbbc3396b591bdeb89786581ebee23f452ac77d4b56359d404c1e4af'

const app = express();

const getRawBody = require('raw-body')
const crypto = require('crypto')

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/webhooks/orders/create', async (req, res) => {
  console.log('🎉 We got an order!')


  const hmac = req.get('X-Shopify-Hmac-Sha256')

  const body = await getRawBody(req)

  const hash = crypto
  .createHmac('sha256', secretKey)
  .update(body, 'utf8', 'hex')
  .digest('base64')

  if (hash === hmac) {
    // It's a match! All good
    console.log('Hello, it came from Shopify!')
    res.sendStatus(200)
  } else {
    // No match! This request didn't originate from Shopify
    console.log('Danger! Not from Shopify!')
    res.sendStatus(403)
  }
})

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
