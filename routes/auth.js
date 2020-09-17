const express = require('express');
const router = express.Router();
const User  = require('../models/user');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
router.post('/',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({msg: 'information incomplete'})
        return;
    }

    User.findOne({email})
    .then(user => {
        if(!user){
            res.status(400).json({msg:'Email doesnt exist'});
            return;
        } else{
            bcrypt.compare(password,user.password)
            .then(matched=>{
                if(!matched){
                    res.status(400).json({msg:'wrong pass'})
                    return;
                } else{
                    jwt.sign({id:user._id},
                        config.get('jwtSecret'),
                        (err,token)=>{
                            if(err) throw err;
                            res.json({
                                token:token,
                            })
                        })
                }
            })
            .catch(err=>res.status(400).json({msg:"kuch gadbad h daya"}));    
        }
    })

})

router.get('/info',auth,(req,res)=>{
    User.findOne({_id:req.user.id},(err,user)=>{
        if(err) {
            res.status(400).send(err);
            return;
        } else{
            res.json({user:user});
        }
    }).select('-password');
})


module.exports = router;