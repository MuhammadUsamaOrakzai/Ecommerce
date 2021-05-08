const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product')
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, () =>{
    console.log('connected to DB!');
});

app.use(express.json());

app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);





app.listen(3000, () => {
    console.log('server is running');
});