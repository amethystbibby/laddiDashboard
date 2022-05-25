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

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/dist/index.html');
// })

// TEST MONGO CONNECTION
const uri =
`mongodb+srv://${username}:${password}@laddi.1dxhy.mongodb.net/?retryWrites=true&w=majority`;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('main')
    const courses = db.collection('courses');

    app.get('/', (req, res) => {
        db.collection("courses").find().toArray()
          .then(data => {
              res.render('index.ejs', {courses : data})
          })
          .catch(error => console.error(error));
      });
   });

// const client = new MongoClient(uri);
// async function run(courses) {
//     try {
//         await client.connect();
//         const database = client.db('main');
//         // const courses = await database.collection('courses').find().toArray();

//         app.get('/', (req, res) => {
//             database.collection("courses").find().toArray()
//               .then(data => {
//                   res.render('index.ejs', {courses : data})
//               })
//               .catch(/* ... */);
//           })
//         return courses;
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }

// run().catch(console.dir);