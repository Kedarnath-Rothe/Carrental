const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null, path.join(__dirname, '../../frontend/public/addarimages'));
    },
    filename : function(req , file , cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})
const upload = multer({storage : storage});

 

const contactForm = require('../controllers/contact_controller');

// Use the upload middleware for single file upload
router.post('/contact', upload.single('aadhar_card'), contactForm);

module.exports = router;
