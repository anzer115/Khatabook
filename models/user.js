const mongoose = require('mongoose') ;


const userSchema = mongoose.Schema({
    email: String,
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ] 
}) ;

module.exports = mongoose.model("user",userSchema) ;