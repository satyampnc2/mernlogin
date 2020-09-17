const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/redux',{ useNewUrlParser: true,useUnifiedTopology: true  });
const app = express();

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')

db.once('open',()=>console.log('db connected'));
const bodyParser = require('body-parser');
db.on('error',(err)=>console.log('error in db'+err));
const user = db.collection('users');
// console.log(user);
app.use(bodyParser.json());
app.use('/users',userRouter);
app.use('/auth',authRouter);
app.use('/tasks',taskRouter);

app.listen(5000,()=>console.log('listening to port 5000...'));
