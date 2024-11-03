const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const DIAMANTE_API_URL = process.env.DIAMANTE_API_URL;
const API_KEY = process.env.API_KEY;

const app = express();
app.use(express.json());

// Set default headers for all requests to Diamante API
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

// Route to register a donor
app.post('/registerDonor', async (req, res) => {
    const { name, age, organ } = req.body;

    if (!name || !age || !organ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create donor data to be stored in Diamante blockchain
        const donorData = {
            name,
            age,
            organ,
            timestamp: new Date().toISOString(),
        };

        // Send data to Diamante Blockchain via API
        const response = await axios.post(`${DIAMANTE_API_URL}/donor/register`, donorData);
        
        res.json({
            message: 'Donor registered successfully on Diamante Blockchain',
            transactionId: response.data.transactionId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch donor details
app.get('/getDonor/:address', async (req, res) => {
    const donorAddress = req.params.address;

    try {
        // Fetch donor data from Diamante blockchain via API
        const response = await axios.get(`${DIAMANTE_API_URL}/donor/${donorAddress}`);

        const donor = response.data;
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        res.json({
            name: donor.name,
            age: donor.age,
            organ: donor.organ,
            registeredAt: donor.timestamp,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
