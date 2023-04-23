const User=require('../models/sign');
const bcrypt=require('bcrypt');

exports.postData=async(req,res,next)=>{
  try{
    const user=await User.findOne({where:{number:req.body._Number}});
   
        if (user ) {
           res.status(202).json({ status: 'error', message: "User already exists"});
        }


        const numUser=await User.findOne({where:{email:req.body._Email}});

 if (numUser) {
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