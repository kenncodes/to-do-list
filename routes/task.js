const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require("../middleware/auth")

const Task = require('../models/Task')

router.post('/', async (req, res) => {
    console.log(req.user)
    if(req.body.name.length > 3){
    try{
        req.body.user = req.user.id
        req.body.isComplete = false
        await Task.create(req.body)
        res.redirect("/tasks")
    }catch(err){
        console.error(err)
        res.redirect("/")
    }
} else{
    console.error("not enough letters")
    res.redirect("/")
}
})

router.put('/:id', ensureAuth, async (req,res) => {
    try{
        let task = await Task.findOneAndUpdate(
            {_id: req.params.id},
            req.body
            )
            res.redirect('/tasks')
    }catch(err){
        console.log(err)
        console.log("unable to update")
    }
})

//deletebutton
router.delete('/:id', ensureAuth, async (req, res) => {
    console.log(req.params.id);
    await Task.deleteOne({
        "_id": req.params.id
    })
        .then(result => {
            console.log(result)
            res.json("Deleted by id")
        })
        .catch(error => console.log(error))
})

module.exports = router