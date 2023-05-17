var form=document.getElementById('form_id');
var list=document.getElementById('items');
var fileform=document.getElementById('fileInput');

form.addEventListener('submit',addMessage);
fileform.addEventListener('submit',sendFile);


//socket code

const socket = io("http://127.0.0.1:3001");
    
    socket.on('connect',()=>{
        console.log(`You are connected with id:${socket.id}`);
    });


    socket.on('receive msg',(receivedMsg)=>{

        console.log('executing')
        console.log(receivedMsg.chats)
        
        lastMessage(receivedMsg.chats[0])
     
    })
// add message function

async function addMessage(e){
    try{
    e.preventDefault();
var message={
    msg:e.target.CHAT.value,
}

const token=localStorage.getItem('token');
const grpId=localStorage.getItem('groupId');
const res=await axios.post(`http://localhost:3001/chat/post/${grpId}`,message,{headers:{'Authorization':token}})

console.log(res.data)
//console.log(res.data)
socket.emit('send-msg',res.data)
}

catch(err){
    console.log(err)
}
  form.reset();

}


window.addEventListener("DOMContentLoaded",async()=>{

    try{

        const token=localStorage.getItem('token')
        
const grpid=localStorage.getItem('groupId')
const datamsg=localStorage.getItem('msg');
         let msgId;

        if(datamsg==='null' ||datamsg===null){
            msgId=-1;
        }

        else{
            let values=JSON.parse(datamsg);;
            values=values[0].slice(-1);
            msgId=values[0].id
            if(msgId===undefined)
            {
                msgId=-1 
            }
        }
        
        const res=await axios.get(`http://localhost:3001/chat/get/${grpid}/${msgId}`,{headers:{'Authorization':token}})
         let newmsg=[];
         if(res.data.chats.length!==0){
            newmsg.push(res.data.chats);
            const msg=localStorage.getItem('msg');
            let msgs=JSON.parse(msg);
           
            if(msgs==='null' || msgs===null){
                localStorage.setItem('msg',JSON.stringify(newmsg))
            }

            else{
                msgs[0].push(res.data.chats[0]);
                localStorage.setItem('msg',JSON.stringify(msgs))
            }
         }


         else{
            const msgs=localStorage.getItem('msg');
            localStorage.setItem('msg',msgs)
         }

         let messages=JSON.parse(localStorage.getItem('msg'));
        messages=messages[0];

        list.innerHTML='';
       for(var i=0;i<messages.length;i++){
        lastMessage(messages[i])
       }
            
    
    }
     catch(err){
                console.log(err)
            }

    })




       function lastMessage(e){
            var newItem=e.message
            Name=e.client.name
            var li = document.createElement('li');
            li.className = 'list-group-item;width-50%';
            li.appendChild(document.createTextNode(Name +" : "+newItem));
            list.append(li);
          }
                    

  async function sendFile(e){
    e.preventDefault();
   let file=e.target.FILE.files[0];
   console.log(file);
   let formData =   new FormData();
   formData.append('file',file)
   console.log('formData',formData.get('file'))
   const token=localStorage.getItem('token');
   const grpId=localStorage.getItem('groupId');
   const res=await axios.post(`http://localhost:3001/file/post/${grpId}`,formData,{headers:{'Authorization':token,'Content-Type': 'multipart/form-data'}})
   console.log(res)

   if(res.status === 200){
    var a = document.createElement("a");
    a.href = res.data.fileUrl;

} else {
    throw new Error(response.data)
}
  }


  document.getElementById('logout').addEventListener('click',()=>{
    localStorage.clear();
    window.location.href='login.html'
  })