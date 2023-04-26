const user_Table=require('../models/sign')
const message=require('../models/chat')
const group=require('../models/group')
const UserGroup=require('../models/userGroup')

exports.addData=async(req,res,next)=>{
    try{
    const data=req.body.msg;
    const id=req.params.id

    
    const chats=await message.create({message:data,clientId:req.user.id,groupId:id})
    res.status(201).json({details:chats})
    }
    catch(err){
        console.log(err)
    }
}


exports.getData=async(req,res,next)=>{
    try{
        const id=req.params.id;
       const chats=await message.findAll({where:{groupId:id}});
       res.status(201).json({chats}) 
    }

    catch(err){
        console.log(err)
        res.status(403).json({mes:'error occured'})
    }
}

exports.createGroup = async(req,res,next)=>{
    try{
    const grpNmae=req.body.grp;

    const detail=await group.create({  groupName:grpNmae});

    res.status(200).json(detail)}
    catch(err){
        console.log(err);
    }
}

exports.getGroup = async(req,res,next)=>{
    try{
         const ids= await UserGroup.findAll({where:{clientId:req.user.id}})

let values=[]
for(var i=0;i<ids.length;i++){
var idValue=ids[i].groupId;
   const value=await group.findAll({where:{id:idValue}});
   values.push({value})
}

console
        res.status(201).json(values);
    }
catch(err){
    console.log(err);
}

}

exports.addUser= async(req,res,next)=>{
try{
    const userMail=req.body._email;

    const user=await user_Table.findOne({where:{email:userMail}});

    const data=await UserGroup.create({clientId:user.id,groupId:req.params.id});

    res.status(200).json({msg:'user added Successfully'});}

    catch(err){
        console.log(err);
        res.status(403).json({msg:'something went wrong'});
    }

}
