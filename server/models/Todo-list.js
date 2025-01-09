const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' },
});

const Task=mongoose.model("Task",taskSchema);

module.exports=Task;