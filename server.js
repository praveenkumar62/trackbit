const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const path = require('path');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connection established successfully');
});

const exerciseRoutes = require('./routes/exercises');
const usersRoutes = require('./routes/users');

app.use('/exercises', exerciseRoutes);
app.use('/users', usersRoutes); 

// serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('tracker/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'tracker', 'build', 'index.html'));
    });
}

app.listen(port, () => { 
    console.log('Server is Up and running successfully on',port);
});

