const table = document.getElementById('UserTable');
window.addEventListener("DOMContentLoaded",showUserInGroup);
async function showUserInGroup() {
    const token = localStorage.getItem('token');
    const groupId = localStorage.getItem('groupId');
    const response = await axios.get(`http://localhost:3001/index/getGroupUser/${groupId}`);
   // console.log(response.data.users[0]);
    
    //console.log(response)
    response.data.users.forEach(Element => {
        //console.log(Element.UserGroups[0].id)
        const tr = document.createElement('tr');
        var td2 = document.createElement('td');
        td2.innerText = Element.name;
        tr.appendChild(td2);
        if(Element.UserGroups[0].isAdmin===null || Element.UserGroups[0].isAdmin===false){

        const create=document.createElement('button');
        create.innerText='Create Admin';
        create.className='btn admin';
        create.id=Element.UserGroups[0].id
        tr.appendChild(create)} 
        
        else{
            const create=document.createElement('button');
        create.innerText='Remove Admin';
        create.className='btn Removeadmin';
        create.id=Element.UserGroups[0].id
        tr.appendChild(create)
        }
        table.appendChild(tr);
    })
}


table.addEventListener('click',createAdmin);

async function createAdmin(e){

    if(e.target.classList.contains('admin')){
        const id=e.target.id;
        const token=localStorage.getItem('token')
        const grpId={
            _GRPID:localStorage.getItem('groupId')
        }
        const res=await axios.post(`http://localhost:3001/admin/create/${id}`,grpId,{headers:{'Authorization':token}})
alert(res.data.msg)
  }
}

table.addEventListener('click',removeAdmin);

async function removeAdmin(e){

    if(e.target.classList.contains('Removeadmin')){
        const token=localStorage.getItem('token');
        const id=e.target.id;
        const _grpId={
            grpId:localStorage.getItem('groupId'),
        }

        const res=await axios.post(`http://localhost:3001/admin/remove/${id}`,_grpId,{headers:{'Authorization':token}})

        alert(res.data.msg)
    }
}





