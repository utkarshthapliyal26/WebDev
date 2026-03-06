const API = "http://localhost:5000/tasks";

let tasks = [];
let filter = "all";

async function loadTasks(){
    const res = await fetch(API);
    tasks = await res.json();
    render();
}

async function addTask(){

    const title = document.getElementById("title").value;
    const priority = document.getElementById("priority").value;

    if(title.trim()==""){
        alert("Enter task");
        return;
    }

    await fetch(API,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,priority})
    });

    document.getElementById("title").value="";
    loadTasks();
}

async function deleteTask(id){

    await fetch(API+"/"+id,{
        method:"DELETE"
    });

    loadTasks();
}

async function toggleTask(id){

    await fetch(API+"/"+id+"/status",{
        method:"PATCH"
    });

    loadTasks();
}

function filterTasks(type){
    filter=type;
    render();
}

function render(){

    const list = document.getElementById("taskList");
    list.innerHTML="";

    let filtered = tasks;

    if(filter=="active"){
        filtered = tasks.filter(t=>!t.isDone);
    }

    if(filter=="completed"){
        filtered = tasks.filter(t=>t.isDone);
    }

    filtered.forEach(t=>{

        const li = document.createElement("li");

        if(t.isDone){
            li.classList.add("completed");
        }

        li.innerHTML=`
        <span class="${t.priority.toLowerCase()}">
        ${t.title} (${t.priority})
        </span>

        <div>
        <button onclick="toggleTask(${t.id})">Done</button>
        <button onclick="deleteTask(${t.id})">Delete</button>
        </div>
        `;

        list.appendChild(li);

    });

    const completed = tasks.filter(t=>t.isDone).length;

    document.getElementById("counter").innerText=
    "Completed "+completed+" / "+tasks.length;

}

loadTasks();