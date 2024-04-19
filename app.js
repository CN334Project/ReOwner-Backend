const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import dotenv for environment variables

dotenv.config(); // Load environment variables from .env file

const productRoutes = require('./routes/productRoutes');

const app = express();

const MONGODB_URI = process.env.MONGODB_URI; // Use environment variable for MongoDB URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successfully connecting to MongoDB
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});

app.use(express.json());

app.use('/products', productRoutes);
