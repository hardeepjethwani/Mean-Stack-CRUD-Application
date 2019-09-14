//Import all the dependencies and define variables
var express = require('express');
var app = express();
var port = process.env.PORT || 3017;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router =express.Router();
var  appRoutes = require('./app/routes/api')(router)
var path = require('path'); // no need to install


//middlewares
app.use(morgan('dev')); // show the request status on server terminal
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // giving access to static location for frontend
app.use('/api', appRoutes); // followback path /api

//Connecting to MongoDB using mongoose
mongoose.connect('mongodb://localhost:27017/authpro', function(err){
    if(err){
        console.log('Not connected to database' + err);
        throw err; 
    }else{
        console.log('Successfully connected to database');
    }
}, {useNewUrlParser: true});


//Redirect to Home page if Any Random URL is Entered
app.get('*', function (req,res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
})

//Start server on port (here 3017)
app.listen(port, function () {
    console.log("Running server on port :"+ port);
});
