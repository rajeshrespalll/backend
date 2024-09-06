const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// app
const app = express();
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', authRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));