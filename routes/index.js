const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

//login page
router.get("/", ensureGuest, (req, res) => {
    res.render('login.ejs')
})

router.get("/tasks", ensureAuth, async (request, response) => {
    //find all tasks
    try{
        console.log(request.user)
        const tasks = await Task.find({user: request.user}).lean()
        response.render('index.ejs', {tasks: tasks, user: request.user})
    }catch(err){
        console.error(err)
    }
    /*Task.find().toArray()
        .then(results => {
            //console.log(results);
            //send it to the ejs file
            response.render('index.ejs', { tasks: results })
        })
        .catch(error => console.log(error))*/
})

router.post("/tasks", async (req,res) => {
    try{

    }catch(err){
      
    }
})
module.exports = router;