
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("all").checked = true;
});

/*    const enterButton = document.querySelector("#enterButton");

enterButton.addEventListener('click', _ => {
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
        fetch(`task/${id}`, {
            method: 'put',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                id: id,
                isComplete: isComplete
            })
        })
        .then(res => {
            window.location.reload();
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
        fetch(`/task/${taskId}`, {
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

var complete = document.getElementById("complete");
complete.addEventListener('click', function() {
    var lis = document.querySelectorAll(".taskLi");
 //   alert("hello")
    lis.forEach(li => {
        if(li.childNodes[1].checked == true){
            li.setAttribute("style", "display:block");
        }else{
            li.setAttribute("style", "display:none");
        }
        console.log(li);
    })
})

var all = document.getElementById("all");
all.addEventListener('click', function() {
    var lis = document.querySelectorAll(".taskLi");
   // alert("hello")
    lis.forEach(li => {
            li.setAttribute("style", "display:block");
    })
})

var incomplete = document.getElementById("incomplete");
incomplete.addEventListener('click', function() {
    var lis = document.querySelectorAll(".taskLi");
   // alert("hello")
    lis.forEach(li => {
        if(li.childNodes[1].checked === false){
            li.setAttribute("style", "display:block");
        }else{
            li.setAttribute("style", "display:none");
        }
        console.log(li.childNodes[1].checked);
       
    })
})

/*var listCheckbox = document.querySelectorAll(".taskLi");
listCheckbox.forEach(checkbox => {
   checkbox.addEventListener('click', function(){
    checkbox.click();
    console.log("clicked li");
   // window.location.reload();
   })
})*/