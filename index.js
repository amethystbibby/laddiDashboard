const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

// Get user details from environment variables
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

// Set up Express application on port 8000
app.listen(8000, function() {
    console.log("listening on 8000");
})

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/flowbite'));
app.set('view engine', 'ejs');

// TEST MONGO CONNECTION
const uri =
`mongodb+srv://${username}:${password}@laddi.1dxhy.mongodb.net/?retryWrites=true&w=majority`;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('main')
    const courses = db.collection('courses');
    console.log(db.collection("firstCollection").find().toArray())

    app.get('/', (req, res) => {
        db.collection("courses").find().toArray()
          .then(data => {
              res.render('index.ejs', {courses : data})
              console.log(data);
          })
          .catch(error => console.error(error));
      });
   });