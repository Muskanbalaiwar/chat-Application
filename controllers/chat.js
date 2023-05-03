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
    const data=await group.findOne({where:{groupName:grpNmae,createdAt:detail.createdAt}})
    const user=await UserGroup.create({isAdmin:true,clientId:req.user.id,groupId:data.id})

    console.log('>>>>>>>>>>>>>>>>'+data.id)
    res.status(200).json(detail);


}
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

exports.getGroupUsers=async(req,res,next)=>{
try{
    const users=await user_Table.findAll({
        attributes: ['id','name'],
        include:{
            model:UserGroup,
            where:{
                groupId:req.params.id,
            }
        }
    })

    res.status(200).json({ users });
}
catch(err){
    console.log(err);
}
}


exports.deleteGroup = async(req,res,next)=>{
    try{
        await group.destroy({where:{id:req.params.id}});
        res.status(201).json({msg:'group deleted successfully'})
    }

    catch(err){
        console.log(err);
    }
}


exports.createAdmin=async(req,res)=>{
    try{
        console.log(">>>>>>>>>>>"+req.body._GRPID)
        const user=await UserGroup.findOne({where:{isAdmin:true,clientId:req.user.id,groupId:req.body._GRPID}});
        if(user===null){
            res.status(201).json({msg:'you do not have this access'});
        }
        else{
            await UserGroup.update({
                isAdmin:true,},
                {where:{
                    groupId:req.body._GRPID,
                    id:req.params.id,
                }}
            )

            res.status(200).json({msg:'Admin created!'})
        }
    }

    catch(err){
        console.log(err);
    }
}


exports.removeAdmin=async(req,res)=>{
try{
    await UserGroup.update({
        isAdmin:false,},{where:{groupId:req.body.grpId,id:req.params.id}}
    )

    res.status(201).json({msg:'Admin has been removed'})
}
catch(err){
    console.log(err);
}
}


exports.removeUser=async(req,res)=>{
    try{


        const userMail=req.body._email;

    const user=await user_Table.findOne({where:{email:userMail}});

    const data=await UserGroup.destroy({where:{clientId:user.id,groupId:req.params.id}});

    res.status(200).json({msg:'user removed Successfully Successfully'});
    }

    catch(err){
        console.log(err);
    }
}


exports.findAdmin=async(req,res)=>{
    try{
        
        console.log('>>>>>>>>>>>>>>>>>'+req.params.id)
        const admin=await UserGroup.findOne({where:{isAdmin:true,clientId:req.user.id,groupId:req.params.id}})
        console.log('>>>>>>>>>>>>>>>>>'+admin)
res.status(200).json({admin})
    }

    catch(err){

    }
}