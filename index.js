const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// database configuration
//const url = "mongodb://localhost:C2y6yDjf5%2FR%2Bob0N8A7Cgv30VRDJIWEHLM%2B4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw%2FJw%3D%3D@localhost:65200/studentDB?ssl=false"; // Replace with your MongoDB connection URL
const url = "mongodb://smcosmongo:3WV3BjzeWZR6NwO5SUia6pT6MssxRLTQGd7HpN4SYx7Qoe1BF89b8118lRF6boAbHeIqSTCg5dLLACDbEQKo2Q%3D%3D@smcosmongo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000"
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

const studentrouter= require("./routes/students");
app.use('/students',studentrouter)

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Azure Cosmos DB CRUD App using Node and Express"});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

