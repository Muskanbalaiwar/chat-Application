const User=require('../models/sign');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.postData=async(req,res,next)=>{
  try{
    const user=await User.findOne({where:{number:req.body._Number}});
    const numUser=await User.findOne({where:{email:req.body._Email}});
        if (user || numUser) {
           res.status(202).json({ status: 'error', message: "User already exists"});
        }

else{
    console.log( req.body._Name);
    const name=req.body._Name;
    const email=req.body._Email;
    const number=req.body. _Number
    const password=req.body._Password;
  
    

   
    const salt=10;
    bcrypt.hash(password,salt,async (err,hash)=>{
      if(err){
       throw new Error(err)
      }
      //console.log('hash')
      
      const data=await User.create({name:name,email:email,number:number,password:hash})
   
    res.status(201).json({details:data})
    })
    }}
    
    catch(err){
      
        console.log('err');
        res.status(500).json({error:err})
    }
}


function generateToken(id){
  return jwt.sign({userId:id},'ScreatKey');
}

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

exports.login=async(req,res,next)=>{
  try{
  const email=req.body._email;
  const password=req.body._password
if(isNumeric(email)){
  const user= await User.findAll({where:{Number:email}})

  if(user.length>0){
    bcrypt.compare(password,user[0].password, (err,result)=>{
     if(err){
       throw new Error('Something went wrong');
     }
     if(result===true)
     {
       res.status(200).json({success:true,message:'login seccessfully',token:generateToken(user[0].id)})
     }
 
     else{
       res.status(400).json({success:false,message:'password is incorrect'})
     }
    }) 
   }
   else{
     res.status(404).json({success:false,message:'User not exist'})
   }
 

}
else{
 const user= await User.findAll({where:{email:email}})
  if(user.length>0){
   bcrypt.compare(password,user[0].password, (err,result)=>{
    if(err){
      throw new Error('Something went wrong');
    }
    if(result===true)
    {
      res.status(200).json({success:true,message:'login seccessfully',token:generateToken(user[0].id)})
    }

    else{
      res.status(400).json({success:false,message:'password is incorrect'})
    }
   }) 
  }
  else{
    res.status(404).json({success:false,message:'User not exist'})
  }
}}
  catch(err){
   
   res.status(500).json({message:err,success:false})
}
}