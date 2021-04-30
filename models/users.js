const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate(value){
            if(value.length<6){
                throw new Error("Please enter name of at least 6 chars")
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonen:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true,
    },
    images:{
        type:Object,
        required:true
    }
},{
    timestamps:true,
})

userSchema.methods.ValidateAge = function(){
    const user = this;
    const ddob = user.dob;
    if(ddob==null){
        throw new Error("Please enter the date of your birth")
    }
    var currDate = new Date();
    var currMonth = currDate.getMonth();
    var currYear = currDate.getFullYear();
    var enteredMonth = ddob.getMonth();
    var enteredYear=  ddob.getFullYear();

    var ac = 216;
    if(currYear - enteredYear>10){
        var doneMonths = 12-enteredMonth+1;
        doneMonths = doneMonths+currMonth;
        if(currYear - enteredYear>1){
            var dif = currYear - enteredYear;
            dif--;
            var addMonths = 12*dif;
            doneMonths+=addMonths;
        }
        return doneMonths

    }else{
        throw new Error("You are not above or equal to 18");
    }
}

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User',userSchema);

module.exports = User;


// hivado22hivado