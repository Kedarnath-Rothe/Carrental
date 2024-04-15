require('dotenv').config();
const express = require('express');
const { route } = require('./router/user_router');

const userRoute = require('./router/user_router');
const contactRoute = require('./router/contact_router') 
const adminRoute = require('./router/admin_router');
const carsRoute = require('./router/cars_router');
const connectDB = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

const cors = require('cors');

const app = express();


//lets tackle cors policy
const corsOptions = {
    origin : "https://rentmycar-kappa.vercel.app",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credential : true,
}

app.use(cors(corsOptions));

app.use(express.json())                                          //Express middleware handles the json data

app.use('/api/auth', userRoute);                                      //Go to the auth-router.js run thes code on /api/auth/.....
app.use('/api/form', contactRoute);
app.use('/api/admin', adminRoute);
app.use('/api/data', carsRoute);

app.use(errorMiddleware);

const port = process.env.PORT || 8080;

// connectDB
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port : ${port} `);
    })
})