const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

// Setup schema
var userShema = mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate:[isEmail],
        lowercase:true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
        max:1024,
        minLength:6,
    },
    picture:{
        type:String,
        default:"./uploads/profil/random-user.png"
    },
    bio:{
        type:String,
        max:1024,
    },
    followers:{
        type:[String]
    },
    following:{
        type:[String]
    },
    likes: {
        type:[String]
    }
},
{
    timestamps:true,
});

// play function before save into display:'block'
userShema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
const UserModel = module.exports= mongoose.model("user",userShema);

module.exports.get = function (callback, limit) {
    UserModel.find(callback).limit(limit);
}