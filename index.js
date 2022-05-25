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

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

// TEST MONGO CONNECTION
const uri =
`mongodb+srv://${username}:${password}@laddi.1dxhy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function run(courses) {
    try {
        await client.connect();
        const database = client.db('main');
        const courses = await database.collection('courses').find().toArray();

        console.log(courses);
        return courses;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);