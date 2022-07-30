const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { ObjectId } = require('mongodb')

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todolist',
    collection

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log("connected to database");
        //console.log(client);
        db = client.db(dbName);
        collection = db.collection('tasks');
    })


app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

//show list of all tasks or no tasks
app.get("/", (request, response) => {
    //find all tasks
    collection.find().toArray()
        .then(results => {
            //console.log(results);
            //send it to the ejs file
            response.render('index.ejs', { tasks: results })
        })
        .catch(error => console.log(error))
})

//add new task
app.post('/addtask', (req, res) => {
    if (req.body.name.length > 3) {
        collection.insertOne({
            name: req.body.name,
            isComplete: false
        })
            .then(result => {
                //console.log(result)
                res.redirect("/")

            })
            .catch(error => console.error(error))
    } else {
        console.log("not enough letters")
        res.redirect("/")
    }
})

//update if completed?
app.put('/updatetask/:id', (req, res) => {
    console.log(req.params.id);
    collection.findOneAndUpdate(
        { "_id": ObjectId(req.params.id)},
        {  
            $set:{ isComplete: req.body.isComplete }
        
        }
    )
    .then(result => { 
        res.json("success");
       
    } )
    .catch(error => console.error(error))

})

//deletebutton
app.delete('/deletetask/:id', (req, res) => {
    console.log(req.params.id);
    collection.deleteOne({
        "_id": ObjectId(req.params.id)
    })
        .then(result => {
            console.log(result)
            res.json("Deleted by id")
        })
        .catch(error => console.log(error))
})

const port = process.env.PORT || 3000
app.listen(port);