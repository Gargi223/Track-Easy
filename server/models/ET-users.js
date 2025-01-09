const mongoose=require('mongoose')

const ETuserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const ETuserModel = mongoose.model("ETusers" , ETuserSchema)
module.exports=ETuserModel