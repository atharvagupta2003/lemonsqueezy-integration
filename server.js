const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Ensure your index.html is in the 'public' directory

app.post('/create-checkout', async (req, res) => {
    try {
        const response = await axios.post('https://api.lemonsqueezy.com/v1/checkouts', {
            data: {
                type: 'checkouts',
                attributes: {
                    checkout_data: {
                        custom: {
                            user_id: '123', // Replace with dynamic user ID if available
                            email: '[email protected]' // Replace with dynamic user email if available
                        }
                    }
                },
                relationships: {
                    store: {
                        data: {
                            type: 'stores',
                            id: process.env.STORE_ID // Your Lemon Squeezy store ID
                        }
                    },
                    variant: {
                        data: {
                            type: 'variants',
                            id: process.env.VARIANT_ID // Your product variant ID
                        }
                    }
                }
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
                'Content-Type': 'application/vnd.api+json'
            }
        });

        const checkoutUrl = response.data.data.attributes.url;
        res.json({ checkout_url: checkoutUrl });
    } catch (error) {
        console.error('Error creating checkout:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to create checkout session.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
