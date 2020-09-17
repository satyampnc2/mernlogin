const express = require('express');
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type: String,
        isRequired: true
    },
    email:{
        type: String,
        isRequired: true
    },
    password:{
        type: String,
        isRequired: true
    }
})

const User = module.exports = mongoose.model('User',userSchema);