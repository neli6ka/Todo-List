const divTodoContainer = document.getElementById("todo_container")
const btn = document.getElementById("fetch")
const inputSearch = document.getElementById("search")


const getAllTodos = () => {
    
    let baseUrl = "https://jsonplaceholder.typicode.com/todos/";
    let userId = inputSearch.value;
    
 if(userId) {
   
    baseUrl = baseUrl + "?userId=" + userId
 } else {
    baseUrl = baseUrl
 } 
  
  fetch(baseUrl)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        alert("Sorry... something went wrong. See console for more info")
        console.log(error)
      }
    })
    .then((todos) => {
        btn.textContent = 'FETCH ALL'
        divTodoContainer.innerHTML = "";
        let todoElement = document.createElement("span")
        divTodoContainer.appendChild(todoElement)

        todos.map((todo) => {
        
        let todoListElement = document.createElement("div")
        let completed = document.createElement("input")
        let title = document.createElement("span")

        title.textContent = `${todo.title}`

        todoListElement.setAttribute("class", "todo-list-element")
        todoListElement.setAttribute("data-userId", todo.userId)
        todoListElement.setAttribute("data-completed", todo.completed)
        completed.setAttribute("class", "box")
        completed.setAttribute("type", "checkbox")
        completed.setAttribute("disabled", true)

        if (todo.completed === true) {
          completed.setAttribute("checked", "checked")
        }

        title.setAttribute("class", "todo-list-element-title")

        todoListElement.appendChild(completed)
        todoListElement.appendChild(title)
        divTodoContainer.appendChild(todoListElement)

        let dropDownBtn = document.querySelector(".dropbtn")
        dropDownBtn.style.display = "block"
      });

      

      if(todos.length > 0 && userId) {
       todoElement.textContent = "TODOs for user with id " + userId
       
      } else if(todos.length > 0 && !userId) {
        todoElement.textContent = "ALL TODOs"
       
        
      } else if(todos.length === 0 && userId)  {
        todoElement.textContent = "No Results for user with id " + userId
        
      }

      
    })
    .catch((error) => {
      alert("Sorry... something went wrong. See console for more info")
      console.log(error)
    })
};

const filterRecords = (req) => {
  const todoListElements = document.querySelectorAll(".todo-list-element")

  todoListElements.forEach(todoListElement => {
    let todoListElementAttribute = todoListElement.getAttribute('data-completed')
    if(req === 'completed') {
        todoListElement.style.display = 'block'
        if(todoListElementAttribute === 'false') {
            todoListElement.style.display = 'none'
        }
    } else if ( req === 'not-completed') {
        todoListElement.style.display = 'block'
        if(todoListElementAttribute === 'true') {
            todoListElement.style.display = 'none'
        } 
    } else if ( req === 'all') {
        todoListElement.style.display = "block"
    }
})
};
let changeButtonText = () => {
    if(inputSearch.value) {
      btn.textContent = 'SEARCH'
    } else {
      btn.textContent = 'FETCH ALL'
    }
};


btn.addEventListener("click", getAllTodos)
inputSearch.addEventListener("keyup", changeButtonText)


