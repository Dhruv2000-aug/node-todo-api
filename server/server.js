const env=process.env.NODE_ENV || "development";
console.log("***env",env);
if(env==="development")
{
    process.env.PORT=3000;
    process.env.MONGO_URI="mongodb+srv://dhruv:@Dhruv2000@cluster0.nt9p2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
}
else{
    console.log("test mongo");
    process.env.PORT=3000;
    process.env.MONGO_URI="mongodb+srv://dhruv:@Dhruv2000@cluster0.nt9p2.mongodb.net/myFirstDatabaseTest?retryWrites=true&w=majority";
}

const express=require('express');
const app=express();
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
var {ObjectID}=require('mongodb')
const _=require('lodash');
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
    var id=req.params.id;
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

//delete from todo api 
app.delete('/todo/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        console.log("This id is not valid");
    }

    TodoDatabse.findByIdAndDelete(id).then((result)=>{
        res.send(result)
    }).catch(err=>{
        res.status(404).send(err.message);
    });
})

//update todo api
app.put('/todo/:id',(req,res)=>{
    var id=req.params.id;

    var body=_.pick(req.body,['text','completed']);

    // if(_.isBoolean(body.completed))
    // {
        body.text="Done";
    // }

    if(!ObjectID.isValid(id))
    {
        console.log("This id is not valid");
    }

    TodoDatabse.findByIdAndUpdate(id,{$set:body},{new:true}).then((result)=>{
        res.send(result)
    }).catch(err=>{
        res.status(404).send(err.message);
    });
})

const PORT=process.env.PORT || 3000;
// listen on port
app.listen(PORT,()=>{
    console.log(`listen on port no ${PORT}`);
})


module.exports ={app};