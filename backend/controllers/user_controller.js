

const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

const Car = require('../models/cars_model');

const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// *-----------------------------
//  Home Logic
// *-----------------------------

const home = async (req, res) => {
    try {
        res.status(200).send("wellcome...");
    }
    catch (error) {
        console.log(error.message);
    }
}


// *-----------------------------
//  Registration Logic
// *-----------------------------

const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;

        const imageUrl = req.headers['x-additional-info'];
        console.log(imageUrl);


        const userExist = await User.findOne({ email });

        const mobileExist = await User.findOne({ phone });

        if (userExist) {
            return res.status(400).json({ message: "email already exist" });
        }

        if (mobileExist) {
            return res.status(400).json({ message: "Mobile number already exist" });
        }

        //Hash the password
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        // let image = req.file ? req.file.filename : 'user.png'; // Set default image here

        const userCreated = await User.create({ username, email, phone, image: imageUrl, password: hash_password })

        const token = await new Token({
            userId: userCreated._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `http://localhost:5173/${userCreated.id}/verify/${token.token}`;
        await sendEmail(userCreated.email, "Verify Email", url);



        res.status(200).json({
            message: "An Email sent to your account please verify",
            token: await userCreated.generateToken(),                                              //Token for authentification
            userId: userCreated._id.toString()
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
}

const verify = async(req,res) => {
    try { 

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" }); 

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
        
		if (!token) return res.status(400).send({ message: "Invalid link" });

        await User.updateOne({ _id: user._id }, { verified: true });
        
		const deletedToken = await Token.deleteOne({ _id: token._id });
        

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
        
		res.status(500).send({ message: "Internal Server Error" });
	}
}


// *-----------------------------
//  Login Logic
// *-----------------------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credintials" });
        }

        const user = await bcrypt.compare(password, userExist.password);          //check valid password

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        if (!userExist.verified) {
            let token = await Token.findOne({ userId: userExist._id });

            // console.log(!token);

            if (!token) {
                token = await new Token({
                    userId: userExist._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();

                const verificationUrl = `http://localhost:5173/${userExist.id}/verify/${token.token}`;
                await sendEmail(userExist.email, "Verify Email", verificationUrl);
                console.log("ha");
                return res.status(400).json({
                    message: "An email has been sent to your account for verification.",
                });
            }

            return res.status(400).json({
                message: "An email was already sent. Please check your inbox to verify.",
            });
        }

        if (user) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),                                              //Token for authentification
                userId: userExist._id.toString()
            })
        }
        else {
            res.status(401).json({ message: "Invalid Credintial" });
        }

    }
    catch (error) {
        res.status(500).json("internal server error")
    }
}

// *-----------------------------
//  User Logic-To send user Data
// *-----------------------------

const user = async (req, res) => {
    try {
        // const userData = await User.find({});
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(` error from user route ${error.message}`);
    }
};


// *-------------------------------------------
// * Get All Cars Logic
// *-------------------------------------------
const getCars = async (req, res) => {
    try {
        const cars = await Car.find({}, { password: 0 });

        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: "No Cars Found" });
        }

        return res.status(200).json(cars);
    }
    catch (error) {
        next(error);
    }

}

// *-------------------------------------------
// * Car Delete
// *-------------------------------------------
const deleteCarById = async (req, res) => {
    try {
        const id = req.params.id;
        await Car.deleteOne({ _id: id });
        return res.status(200).json({ message: "Car deleted Successfully..." });
    }
    catch (error) {
        next(error);
    }
}

// *-------------------------------------------
// * Single Uder Logic
// *-------------------------------------------
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updateData = await User.updateOne(
            { _id: id },
            { $set: updateUserData }
        );

        return res.status(200).json(updateData);
    }
    catch (error) {
        next(error);
    }
}


// *-------------------------------------------
// * Single Car Logic
// *-------------------------------------------
const getCarByID = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const data = await Car.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error.message);
    }
}

// *-------------------------------------------
// * Book Car Logic
// *-------------------------------------------
const bookCar = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updateData = await Car.updateOne(
            { _id: id },
            { $set: updateUserData }
        );

        return res.status(200).json(updateData);
    }
    catch (error) {
        next(error);
    }
}



module.exports = {
    home,
    register,
    verify,
    login,
    user,
    getCars,
    deleteCarById,
    updateUserById,
    bookCar,
    getCarByID,
};