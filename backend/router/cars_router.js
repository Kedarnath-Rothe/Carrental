const express = require('express');
const controller = require('../controllers/cars_controller');

const router = express.Router(); 

const multer = require("multer");                               //Upload Images
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null, path.join(__dirname, '../../frontend/public/carimages'));
    },
    filename : function(req , file , cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})
const upload = multer({storage : storage});

router.route('/addcar').get(controller.addcar);

router.route('/addcar').post(upload.single('image'), controller.addcar);


router.route('/service').get(controller.services);  


module.exports = router;