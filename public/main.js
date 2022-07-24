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
