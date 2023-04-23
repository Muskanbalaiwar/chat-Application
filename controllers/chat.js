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