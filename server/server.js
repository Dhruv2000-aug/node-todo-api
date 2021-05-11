const express=require('express');
const app=express();
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
var {ObjectID}=require('mongodb')

//config the env path
dotenv.config({path:"config.env"});

//import connection file
const db=require('./database/connection')
//call the connection function
db();

// Todo model
const TodoDatabse=require('./model/Todo');


// TodoDatabse.find().then((result)=>{
//     console.log(JSON.stringify(result,undefined,2 ));
// })
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    log
    res.send("Welcome Dhruv")
})


//post todo in database
app.post('/todo',(req,res)=>{
    var todo=new TodoDatabse({
        text:req.body.text
    })

    todo.save().then((doc)=>{
        // console.log("Data inserted successfully.");
        res.send(doc)
    })
    .catch(err=>err.message)
})

//get all todo data
app.get('/todo',(req,res)=>{
    
    TodoDatabse.find().then((data)=>{
        res.send({data});
    })
})

//get the single data id params
app.get('/todo/:id',(req,res)=>{
    const id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        console.log("not valid this Id");
    }

    TodoDatabse.findById(id).then((result)=>{
        res.send({todo:result})    
    }).catch(err=>{
        res.send(err.message)
    })
})
const PORT=process.env.PORT || 3000;
// listen on port
app.listen(PORT,()=>{
    console.log(`listen on port no ${PORT}`);
})


module.exports ={app};