// server/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/create-checkout', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.lemonsqueezy.com/v1/checkouts',
      {
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              custom: {
                user_id: '123',
              },
            },
          },
          relationships: {
            store: { data: { type: 'stores', id: process.env.STORE_ID } },
            variant: { data: { type: 'variants', id: process.env.VARIANT_ID } },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
          'Content-Type': 'application/vnd.api+json',
        },
      }
    );

    const checkoutUrl = response.data.data.attributes.url;
    res.json({ checkout_url: checkoutUrl });
  } catch (error) {
    console.error('Error creating checkout:', error.response?.data || error.message);
    res.status(500).json({ error: 'Checkout creation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
