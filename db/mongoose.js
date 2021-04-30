const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(()=> console.log("Connected to the db")).catch((e)=> console.log(e))
