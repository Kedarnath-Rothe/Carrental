const {Schema, model, Mongoose} = require('mongoose');

const carSchema = new Schema({
    carname : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    owner_name : {
        type : String,
        required : true
    },

    owner_phone : {
        type : Number,
        required : true, 
    },
    image : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    booked : {
        type : Boolean,
        default : false
    },


    //After Booking------------->

    start_date : {
        type: Date,
        default: null
    },

    end_date : {
        type: Date,
        default: null
    },

    cust_id : {
        type : String, 
        default : ""
    },

    cust_name : {
        type : String, 
        default : ""
    },

    cust_phone : {
        type : Number, 
        default : null
    },

    total : {
        type : Number,
        default : 0
    },

    transaction_id : {
        type : String, 
        default : ""
    }



})
 
const Car = new model("Car", carSchema);

module.exports = Car;