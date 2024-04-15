const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
 
const authMiddleware = async(req, res, next) => {
  const token = req.header("Authorization");

  if(!token) {
    return res.status(401).json({message : "Unathoruzed HTTP, Token not provided"});
  }

  // console.log(token);

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();
  // console.log(jwtToken);

  try{
    
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(isVerified);

    // getting the complete user details & also we don't want password to be sent
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    // console.log('hi');

    req.token = token;
    req.user = userData;
    req.userID = User._id;
    // console.log('hi');

    // Move on to the next middleware or route handler
    next();
  }
  catch(error){
    console.log(error.message);
    return res.status(401).json({message : "Unathoruzed token."})
  }

}

module.exports = authMiddleware;