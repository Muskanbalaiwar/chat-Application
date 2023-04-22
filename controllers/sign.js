const User=require('../models/sign');
const bcrypt=require('bcrypt');

exports.postData=async(req,res,next)=>{
  try{

    console.log( req.body._Name);
    const name=req.body._Name;
    const email=req.body._Email;
    const number=req.body. _Number
    const password=req.body._Password;
  
    

   
    const salt=10;
    bcrypt.hash(password,salt,async (err,hash)=>{
      console.log(err);
      //console.log('hash')
      const data=await User.create({name:name,email:email,number:number,password:hash})
      //console.log('answer')
    res.status(201).json({details:data})
    })
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}