var form=document.getElementById('form_id');
var list=document.getElementById('items')
form.addEventListener('submit',addMessage);

async function addMessage(e){
    try{
    e.preventDefault();
var message={
    msg:e.target.CHAT.value,
}

console.log(message)
const token=localStorage.getItem('token');
const res=await axios.post("http://localhost:3001/chat/post",message,{headers:{'Authorization':token}})
console.log(res.data.details.message)
showData(res.data.details)
}

catch(err){
    console.log(err)
}

}


window.addEventListener("DOMContentLoaded",async()=>{

    try{
const token=localStorage.getItem('token');

const res=await axios.get("http://localhost:3001/chat/get",{headers:{'Authorization':token}})
console.log(res.data.chats.message)
for(var i=0;i<res.data.chats.length;i++){

    showData(res.data.chats[i]) 
}
    }

    catch(err){
        console.log(err)}

})

function showData(e){
    var newItem = e.message;
    

    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));
    list.append(li);
}