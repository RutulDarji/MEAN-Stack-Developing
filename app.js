const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const config= require('./config/database');

// connect with mongodb
mongoose.connect(config.database);

// check weather we are conneted with database
mongoose.connection.on('connected', ()=> {
    console.log('Connected to database '+ config.database);
});

// check Database error
mongoose.connection.on('error', (err)=> {
    console.log('Database error '+ err);
});

const app = express();
const port=3000;

const users= require('./routes/users');
const articles= require('./routes/articles');

// app middleware of cors
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint for Practise');
});

// anythin goes to the /users go to that routes
app.use('/users', users);

// anything goes to / articles got to this route
app.use('/articles', articles);

// start server
app.listen(port , () =>{
    console.log('Server running of '+port);
});

