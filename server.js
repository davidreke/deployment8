const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose')

const app = express();

// allows us to have environment variables in the .env file

require('dotenv').config()

// start middleware

const port = process.env.port || 5000

app.use(cors());
app.use(express.json())


// end middleware

const uri = process.env.ATLAS_URI
mongoose.connect( uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('mongodb database connection established succesfully')
})

// start Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')
app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)
// end Routes

app.use(express.static('client/build'));

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})