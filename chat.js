var form=document.getElementById('form_id');

form.addEventListener('submit',addMessage);

async function addMessage(e){
    e.preventDefault();
var message={
    msg:e.target.CHAT.value,
}

console.log(message)
}