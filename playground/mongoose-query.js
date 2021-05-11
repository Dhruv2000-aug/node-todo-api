const db=require('../server/database/connection');
db();
const Todo=require('../server/model/Todo');
const mongoose=require('mongoose');
const mongodb=require('mongodb');

Todo.findById("6098e7e856b84c052c82e6d6").then((result)=>{
    console.log(result);  
      
}).catch(err=>{
    
    console.log(err.message);
})

Todo.find().then((result)=>{
    console.log(result);  
      
}).catch(err=>{
    
    console.log(err.message);
})