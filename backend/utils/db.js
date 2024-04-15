const mongoose = require('mongoose');

require('dotenv').config();

const URI = 'mongodb+srv://kedarrothe05:DaNEgyH1iqw3arQh@cluster0.d7n7xir.mongodb.net/CarRental?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async() => {
    try{ 
        // await mongoose.connect(URI);
        await mongoose.connect(URI);
        console.log("Connection successful to DB");
    }
    catch(error){
        console.log(error.message);
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports = connectDB;



// usrname : kedarrothe05

// pass : WKzeMPwHQpoB4kb5
// https://storyset.com/login