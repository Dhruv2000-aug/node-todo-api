const mongoose=require('mongoose');

const todoSchema=mongoose.Schema({
    text:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    Status :{                    
        type:Boolean,
        default:false
    },
    textCode:{
        type:String,
        default:null
    }
  
})

const Todo=mongoose.model('todo',todoSchema);
module.exports = Todo;