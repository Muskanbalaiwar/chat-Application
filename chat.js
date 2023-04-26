var form=document.getElementById('form_id');
var list=document.getElementById('items');
var groupFrom=document.getElementById('group');
var table=document.getElementById('tables');
var userForm=document.getElementById('addUser')
form.addEventListener('submit',addMessage);
groupFrom.addEventListener('submit',addGroup);
userForm.addEventListener('submit',addUser)
async function addMessage(e){
    try{
    e.preventDefault();
var message={
    msg:e.target.CHAT.value,
}

const token=localStorage.getItem('token');
const grpId=localStorage.getItem('groupId');
const res=await axios.post(`http://localhost:3001/chat/post/${grpId}`,message,{headers:{'Authorization':token}})
console.log(res.data.details.message)
lastMessage(res.data.details)
}

catch(err){
    console.log(err)
}

}


window.addEventListener("DOMContentLoaded",async()=>{

    try{

getGroup();

    }

    catch(err){
        console.log(err)}

})


async function addGroup(e){
    try{
    e.preventDefault()
console.log('group');

const group={
    grp:document.getElementById('group_name').value,
}
console.log(group);

const res=await axios.post("http://localhost:3001/group/post",group);
if(res.status===200){
    alert('group created successfuly');
    showGroups(res.data)
}

}

catch(err){
    console.log(err);
    alert('something went wrong');
}}

async function getGroup(){
    
try{

    const token=localStorage.getItem('token')
    const res=await axios.get("http://localhost:3001/group/get",{headers:{'Authorization':token}});
    console.log(res.data[1].value[0]);
    for(var i=0;i<res.data.length;i++){
        showGroups(res.data[i].value[0]);
       // console.log(res.data[i].value[i]);

    }
    

}
    catch(err){
        console.log(err);
    }
} 



function showGroups(e) {

    const table = document.getElementById('tables');
        const tr = document.createElement('tr');
        const btn = document.createElement('button');
        console.log(e.groupName)
        btn.id=e.id; 
        btn.innerText = e.groupName;
        btn.className='btn  groupName'
        tr.appendChild(btn);
        let deleteAdmin = document.createElement('button');
        deleteAdmin.innerText = 'X';
        deleteAdmin.style.color = 'red';
        deleteAdmin.className='btn delete';
        deleteAdmin.id=e.id;
        btn.append(deleteAdmin)
        table.appendChild(tr);

    table.appendChild(tr);
 
}

table.addEventListener('click',showData);
table.addEventListener('click',deleteGroup);

async function deleteGroup(e){
    if(e.target.classList.contains('delete')){
        console.log(e.target.id)
        
    }
}

async function showData(e){
    try{
        list.innerText=''
    if(e.target.classList.contains('groupName')){
       var values= e.target;
   localStorage.setItem('groupId',values.id)
        const token=localStorage.getItem('token');
        
        
        const res=await axios.get(`http://localhost:3001/chat/get/${values.id}`,{headers:{'Authorization':token}})
       
        for(var i=0;i<res.data.chats.length;i++){
           
            var newItem = res.data.chats[i].message;
    

            var li = document.createElement('li');
            li.className = 'list-group-item;width-50%';
            li.appendChild(document.createTextNode(newItem));
            list.append(li);
        }
            }}
        
            catch(err){
                console.log(err)}
        
            }


  function lastMessage(e){

    var newItem=e.message
    var li = document.createElement('li');
    li.className = 'list-group-item;width-50%';
    li.appendChild(document.createTextNode(newItem));
    list.append(li);
  }  
  
  
  async function addUser(e){
    e.preventDefault();

const user={
    _email:document.getElementById('user_id').value,
}


const grpId=localStorage.getItem('groupId');

const res=await axios.post(`http://localhost:3001/user/add/${grpId}`,user)
if(res.status===200)
alert(res.data.msg)
  }


            


