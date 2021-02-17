const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    tag:{
        type : String, 
        required : true,

    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"question"
    }
});

module.exports = mongoose.model('tag',userSchema);