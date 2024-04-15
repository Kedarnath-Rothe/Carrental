const { Schema, model, default: mongoose} = require("mongoose");

const contactSchema = new Schema({ 
    username: { 
        type: String, 
        required: true 
    }, 
    email: { 
        type: String, 
        required: true 
    }, 
    aadhar_card : {
        type : String,
        default : ""  
    },
    message: { 
        type: String, 
        required: true 
    }, 
});


const Contact = new model("Contact", contactSchema);

module.exports = Contact;