var express = require('express');
var mongoose = require('mongoose');
const Mongo = require('./Mongo')
require('dotenv/config');

const app = express();
var mongo = new Mongo();
/**
 * Requirements of express server
 * 1. Respond to frontend request for updated scores array
 * 2. Set update flag in mongoDB (how to communicate to frontend to update?)
 */


// connect to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () =>
  console.log('connected to DB!')
)


// get request from frontend -> return scoresArray from MongoDB
app.get('/scores', (req, res) => {

  mongo.getScores()
    .then(scoresArray => {
      res.send(scoresArray)
      //res.json(scoreArray);
      console.log('sent Scores Array!');
    })
    .catch(err => {
      console.log(err);
    })

})


// start listening to the server...
expressPort = Number(process.env.PORT || 3000)
app.listen(expressPort)
console.log('listening on port ' + expressPort)
