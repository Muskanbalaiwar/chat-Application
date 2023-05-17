
const AWS=require('aws-sdk');
const message=require('../models/chat')
const formData=require('form-data');
exports.getfile=async(req,res,next)=>{
    try{
    const file=req.file;
    console.log(file.originalname)
const fileData=file.buffer

    //const userId=req.user.id
    const filename=`${file.originalname}`;
    const fileUrl= await uploadfile(fileData,filename);
    const chats=await message.create({message:data,clientId:req.user.id,groupId:id})
  return res.status(200).json({fileUrl,success:true,chats})
}

  catch(err){
    console.log(err)
    return res.status(500).json({fileUrl : '',success:false})
  }
}
function uploadfile(data,fileName){
    const BUCKET_NAME='expensetracker9149';
    const IAM_USER_KEY='AKIASFN2YJUGRLS7ANPP';
    const IAM_USER_SECRET='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'

    let s3Bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        //Bucket:BUCKET_NAME
    })

    
        var params={
            Bucket:BUCKET_NAME,
            Key:fileName,
            Body:data,
            ACL:'public-read'
        }

        return new Promise((res,rej)=>{
            s3Bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log('Something went wrong',err);
                    rej(err);
                }
                else{
                    console.log('success',s3response);
                  res(s3response.Location)
                }
            })
        })
       
    
}