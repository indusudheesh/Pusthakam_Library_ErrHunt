const express = require('express'); 
const signupRouter = express.Router();
//importing newly created collection userdata to dynamically store user datas in the database Library, to authenticate login
const userdata=require('../model/usermodel')

signupRouter.get('/',function(req,res){    

    res.render('signup');
    
});

//changed the route method from get to post also change action="POST" in signup.ejs ((part#2 point10))
signupRouter.post('/adduser',function(req,res){

   var user={
       fname:req.body.fname,
       lname:req.body.lname,
       uid:req.body.uid,
       pwd:req.body.pwd
   };

   var newUser=new userdata(user);
   newUser.save();
   res.redirect('/login');
});
module.exports= signupRouter;


