const Contact = require('../models/contact_model');

const contactForm = async (req, res) => {
    try {
        const { username, email, message } = req.body;
        // let imagePath = req.file ? req.file.filename : null; // Getting the path of the uploaded image

        const imageUrl = req.headers['x-additional-info'];
        console.log(imageUrl);


        // console.log(imagePath);
        
        await Contact.create({
            username,
            email,
            message,
            aadhar_card: imageUrl // Storing the image path in the 'aadhar_card' field
        });

        return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Message not delivered" });
    }
};

module.exports = contactForm;
