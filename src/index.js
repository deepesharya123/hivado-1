const express = require('express');
const app = express();
const hbs = require('handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const sendWelcomeEmail = require('../emails/email');
const sharp = require('sharp');

require('../db/mongoose');

const User = require('../models/users');
const viewPath = path.join(__dirname,"../templates/views");
const publicPath = path.join(__dirname,"../public");

app.set('view engine','hbs');
app.set('views',viewPath);

app.use(express.json());
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.render('form')
})

const upload = multer({
    dest:'./public/images/',
    
    fileFilter(req,file,cb){ 
        if(!file){
            return cb(new Error("Please upload a image "))
        }
        if((file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")){
            return cb(undefined,true)
        }else if(file.originalname == undefined){
            return cb(new Error("Please upload a image "))
        }
        cb(new Error("Please upload the image only "))
    }
})

app.post('/user-form', upload.single('images'),async(req,res)=>{
    
    try{
        var user = new User(req.body);
        user.ValidateAge();
        await sendWelcomeEmail(user.email,user.name);
        var image = req.file;
        console.log(image)
        user.images = image
        await user.save();

        const allUser = await User.find({}); 
        res.send(allUser)
        // res.render('allUSer',{showUser:allUser});

    }catch(e){
        // res.send(e)
        res.render('error',{e})
    }

})

app.listen(port,() => console.log(`Listening on port ${port}`));