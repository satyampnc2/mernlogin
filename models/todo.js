const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    _id :{
        type: String,
        required:true
    },
    tasks: [{
        text: String,
        status: String
    }]
})

const Todo = module.exports = mongoose.model('Todo',todoSchema);