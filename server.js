console.log("hi") 

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todolist',
    collection

const MongoClient = mongodb.MongoClient;
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log("connected to database");
        //console.log(client);
        db = client.db(dbName);
        collection = db.collection('tasks');
    })


//show list of all tasks or no tasks
app.get("/", (request, response) => {
    //find all tasks
    collection.find().toArray()
        .then(results => {
            console.log(results);
            //send it to the ejs file
            response.render('index.ejs', { tasks: results})
        })
        .catch(error => console.log(error))
})

//add new task
app.post('/addtask', (req, res) => {
    collection.insertOne({
        name: req.body.name,
        isComplete: false
    })
      .then(result => {
        console.log(result)
        res.redirect("/")
        
      })
      .catch(error => console.error(error))
})




app.listen(process.env.PORT , () => {
    console.log(`Listening on PORT ${process.env.PORT}`)
})