const express = require('express'); 
const loginRouter = express.Router();
//importing newly created collection userdata to dynamically store user datas in the database Library, to authenticate login
const userdata = require('../model/usermodel');


loginRouter.get('/',function(req,res){


    res.render('login',{});
    
})

//route method changed from get to post also method="POST" in login.ejs and make utilization of database ((part#2 point10))
loginRouter.post("/check",function(req,res){
    
    //retreiving userdata and checkin whether user exists.
    userdata.findOne({uid:req.body.uid},(err,data)=>{
      
    if(data)
    {
        if(data.pwd==req.body.pwd)
        {
            
            res.redirect('/home');
        }

    }
    else{
        res.redirect('/signup');
    }
    }) 
});




module.exports = loginRouter;