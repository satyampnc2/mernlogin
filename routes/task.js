const express = require('express');
const Router = express.Router();
const Todo = require('../models/todo');
const router = require('./auth');
const auth = require('../middleware/auth');
// const { db } = require('../models/todo');
// const { db } = require('../models/user');
router.get('/',auth,(req,res)=>{
    Todo.findById(req.user.id,(err,response)=>{
        if(err){
            res.status(400).json({msg:'error occured'})
            return;
        } else{
            if(!response){
                res.json(response);
            } else{
                res.json(response.tasks);
            }
        }
    })
})
router.post('/addTask',auth,(req,res)=>{

    Todo.findByIdAndUpdate(req.user.id,{
        $push : {
            tasks: {
                "text" : req.body.text,
                "status" : req.body.status
            }
        }
    },{upsert:true},(err,todo)=>{
        if(err){
            res.status(400).json({msg:'error occured'})
            return;
        } else{
            res.json({todo:todo})
        }
    })
})
router.post('/updateTask',auth,(req,res)=>{
    Todo.findOneAndUpdate(
        {_id:req.user.id},
        {$set : {"tasks.$[elem].status":"completed"}},
        { new: true, arrayFilters: [{ 'elem.text': req.body.text }]},
        (err,response)=>{
            if(err){
                res.status(400).json({'error': err})
            } else{
                res.json(response);
            }
        })
})

router.post('/deleteTask',auth,(req,res)=>{
    Todo.update(
        {_id:req.user.id},
        {$pull:{'tasks':{text:req.body.text}}},
        {
            new:true
        },
        (err,response)=>{
            if(err){
                res.status(400).json({'error':err});
            } else{
                res.json(response);
            }
        }
        )
})

module.exports = router;