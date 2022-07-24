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