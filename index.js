const express= require('express');
const path = require('path');
// const logger = require('./middleware/logger')
var bodyParser = require('body-parser');


const app= express();

// Init middleware.
// app.use(logger);



// app.get('/',(req,res)=>{
//     // res.send('<h1> helloWorld</h1>');
//     res.sendFile(path.join(__dirname,'public','index.html'))
// });

//writing a static folder
app.use(express.static(path.join(__dirname,'public')));

// Body parser middleware to read incoming req ***********always use befor defining routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// members api router
app.use('/api/jsonDataMembers', require('./routes/api/member'));


const PORT= process.env.PORT || 5000;



app.listen(PORT,()=>console.log(`server started at port ${PORT}`));
