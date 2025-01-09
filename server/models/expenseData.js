const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    merchant:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    report:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        enum:["Paid", "Yet-yo-pay"],
        default:"Paid"
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' },
});

const Expense=mongoose.model("Expense",expenseSchema);

module.exports=Expense;