

var groupFrom=document.getElementById('group');
var table=document.getElementById('tables');
var userForm=document.getElementById('addUser')



groupFrom.addEventListener('submit',addGroup);
userForm.addEventListener('submit',addUser);
table.addEventListener('click',showData);
table.addEventListener('click',deleteGroup);
userForm.addEventListener('click',removeUser);


//socket code

const socket = io("http://127.0.0.1:3001");
    
    socket.on('connect',()=>{
        console.log(`You are connected with id:${socket.id}`);
        // socket.emit('custom-event', 10,"hello",{token:10});
    });

// add message function



// window load
window.addEventListener("DOMContentLoaded",async()=>{

    try{
getGroup();
    }
    catch(err){
        console.log(err)}
})

// create group function
async function addGroup(e){
    try{
    e.preventDefault()
console.log('group');

const group={
    grp:document.getElementById('group_name').value,
}
console.log(group);
const token=localStorage.getItem('token');
const res=await axios.post("http://localhost:3001/group/post",group,{headers:{'Authorization':token}});
if(res.status===200){
    alert('group created successfuly');
    showGroups(res.data)
}

}

catch(err){
    console.log(err);
    alert('something went wrong');
}}


//getting group  from backend function

async function getGroup(){
    
try{

    const token=localStorage.getItem('token')
    const res=await axios.get("http://localhost:3001/group/get",{headers:{'Authorization':token}});
    
    for(var i=0;i<res.data.length;i++){
        showGroups(res.data[i].value[0]);
       // console.log(res.data[i].value[i]);

    }

    //reloadpage();
    

}
    catch(err){
        console.log(err);
    }
} 


// show group at front end
function showGroups(e) {

    const table = document.getElementById('tables');
        const tr = document.createElement('tr');
        const btn = document.createElement('button');
        //console.log(e.groupName)
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


// delete froup function 

async function deleteGroup(e){
    try{
    if(e.target.classList.contains('delete')){
        console.log(e.target.id)
        const grp=localStorage.getItem('groupId')
        const res=await axios.delete(`http://localhost:3001/group/delete/${grp}`)

        if (res.status===201) {
            e.target.parentNode.remove();
            e.target.remove();
        }
            alert(res.data.msg) 
    }}

    catch(err){
        console.log(err)
    }
}
  

// page reloading after a time

// window.onload = function () {
//     setTimeout(()=>{
        
//         reloadpage();
//         console.log('page reloaded>>>>')
//     },10000)
// }

 // show chat of a function
async function showData(e){
    try{
        e.preventDefault();

        if(e.target.classList.contains('groupName')){
            var values= e.target;
            
     
             localStorage.setItem('groupId',values.id)
            const grpid=localStorage.getItem('groupId');
            const token=localStorage.getItem('token');
           
            const res=await axios.get(`http://localhost:3001/admin/find/${grpid}`,{headers:{'Authorization':token}})
            if(res.data.admin===false ||res.data.admin===null){
                document.getElementById('hideDataId').style.display='none';  
            }

           else{
                document.getElementById('hideDataId').style.display='block';
            }

        }
          

      }
     catch(err){
                console.log(err)
            }
 }


  function lastMessage(e){
    var newItem=e.message
    Name=e.client.name
    var li = document.createElement('li');
    li.className = 'list-group-item;width-50%';
    li.appendChild(document.createTextNode(Name +" : "+newItem));
    list.append(li);
  }  

 
  
  
  async function addUser(e){
    e.preventDefault();

     const user={
        _email:document.getElementById('user_id').value,
       }


     const grpId=localStorage.getItem('groupId');
     const token=localStorage.getItem('token');

     const res=await axios.post(`http://localhost:3001/user/add/${grpId}`,user,{headers:{'Authorization':token}})
     if(res.status===200)
    alert(res.data.msg)
    }

  

    // removing user from the group

  async function removeUser(e){
    try{
    if(e.target.classList.contains('removeUser')){
        
        const user={
            _email:document.getElementById('user_id').value,
        }
        const token=localStorage.getItem('token')
        const grpId=localStorage.getItem('groupId');
        const res=await axios.post(`http://localhost:3001/user/remove/${grpId}`,user,{headers:{'Authorization':token}})
        if(res.status===200)
         alert(res.data.msg)
     }}
    catch(err){
        console.log(err)
    }
}
    
 






  
