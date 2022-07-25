const enterButton = document.querySelector("#enterButton");

/*enterButton.addEventListener('click', _ => {
    let taskName = document.getElementById("taskName");
    fetch("/addtask", {
        method: 'post',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'a second task',
            isComplete: false
        })
    })
    .then(res => {
        if(res.ok) return res.json();
        console.log(res.json())
    })
    .then(response => {
        window.location.reload(true);
    })
})*/
const checkButtons = document.querySelectorAll("input[type=checkbox]");
let id = "";
let isComplete;
for(var i=0; i < checkButtons.length; i++){
    //alert(checkButtons[i]);
    checkButtons[i].addEventListener('click', e => {
        const par = e.target.parentElement;
        id= par.id;
        isComplete = e.target.checked;
        //console.log(par);
        //console.log(e.target.checked);
        fetch(`updatetask/${id}`, {
            method: 'put',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                id: id,
                isComplete: isComplete
            })
        })
        .then(res => {
            if( res.ok) return res.json()
        })
        .catch(error => {
           console.log(error)
        })
    })
}

const deleteButtons = document.querySelectorAll("img");
let taskId = "";

for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', e => {
        const li = e.target.parentNode
        console.log(li.id);
        taskId = "" + li.id;
        fetch(`/deleteTask/${taskId}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: taskId,
                isComplete: false
            })
        })
        .then(res => {
            if( res.ok) return res.json()
        })
        .then(res => window.location.reload())
        .catch(data => {
            window.location.reload()
        })
    })
}