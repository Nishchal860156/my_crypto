const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; // Use Render's dynamic port or 3000 for local

// Endpoint to fetch live cryptocurrency data
app.get('/api/recommendations', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 5,
                page: 1,
                sparkline: false,
            },
        });

        const recommendations = response.data.map(coin => ({
            name: coin.name,
            price: coin.current_price,
            change: coin.price_change_percentage_24h,
            volume: coin.total_volume,
        }));

        res.json(recommendations);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
