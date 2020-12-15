//selectors
const todoInput= document.querySelector(".todo-input"); 
const todoButton= document.querySelector(".todo-button"); 
const todoList= document.querySelector(".todo-List"); 
const filterOption=document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DoMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTOdo);

//Functions
function addTodo(Event){
    //console.log("helo");
    //preveent form submitting
    Event.preveentDefault();
    //TODO Div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //creat LI
    const newTodo = document.createElement("l1");
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add to do to localstorage
    saveLocationTodos(todoInput.value);
    //check mark button
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i> ';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i> ';
    trashButton.classList.add("complete-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value="";
}

function deleteCheck(e){
    const item=e.target;
    //DELET TODO
    if(item.classList[0]=== "trash-bit"){
        const todo=item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos("todo");
        todo.addEventListener('transitionend', function(){
            todo.remove();

             
        }); 
        
    } 
    //check mark
    if(item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTOdo(e){
const todos=todoList.childNodes;
todos.forEach(function(todo){
    switch(e.target.value){
      case"all":
        todo.style.display="flex";
        break;
      case"completed":
        if(todo.classList.contains('completed')){
            todo.style.display="flex";
        }else{
            todo.style.display="none";
        }
      case "uncompleted":
        if(!todo.classList.contains('completed')){
            todo.style.display="flex";
        }else{
            todo.style.display="none";
        }
        break;  

    }
 
});

}

function saveLocationTodo(todo){
    //check---hey do i already have thing in there?
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem(todos));
    }    
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function gettodos(){
    //console.log("hello");
    //check---hey do i already have thing in there?
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem(todos));
    }
    todos.forEach(function(todo){
         //TODO Div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //creat LI
    const newTodo = document.createElement("l1");
    newTodo.innerText= todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
  
    //check mark button
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i> ';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i> ';
    trashButton.classList.add("complete-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);

    });
    
  
}
function removeLocalTodos(todo){
    //check---hey do i already have thing in there?
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem(todos));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}
