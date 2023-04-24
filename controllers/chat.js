const message=require('../models/chat')


exports.addData=async(req,res,next)=>{
    try{
    const data=req.body.msg;
    
    const chats=await message.create({message:data,clientId:req.user.id})
    res.status(201).json({details:chats})
    }
    catch(err){
        console.log(err)
    }
}


exports.getData=async(req,res,next)=>{
    try{
       const chats=await message.findAll({where:{clientId:req.user.id}});
       res.status(201).json({chats}) 
    }

    catch(err){
        console.log(err)
        res.status(403).json({mes:'error occured'})
    }
}