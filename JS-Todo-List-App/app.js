const divTodoContainer = document.getElementById("todo_container");
const btn = document.getElementById("fetch");
const inputSearch = document.getElementById("search");
const select = document.getElementById("select");

const getAllTodos = () => {
  let baseUrl = "https://jsonplaceholder.typicode.com/todos/";
  let userId = inputSearch.value;

  if (userId) {
    baseUrl = baseUrl + "?userId=" + userId;
  }

  fetch(baseUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("Sorry... something went wrong. See console for more info");
        console.log(error);
      }
    })
    .then((todos) => {
      btn.textContent = "FETCH ALL";
      divTodoContainer.innerHTML = "";
      let todoElement = document.createElement("span");
      divTodoContainer.appendChild(todoElement);

      displayRecords(todos);
      if (todos.length > 0 && userId) {
        todoElement.textContent = "TODOs for user with id " + userId;
      } else if (todos.length > 0 && !userId) {
        todoElement.textContent = "ALL TODOs";
      } else if (todos.length === 0 && userId) {
        todoElement.textContent = "No Results for user with id " + userId;
      }
    })
    .catch((error) => {
      alert("Sorry... something went wrong. See console for more info");
      console.log(error);
    });
};

const displayRecords = (todos) => {
  todos.forEach((todo) => {
    let todoListElement = document.createElement("div");

    let completed = document.createElement("input");
    let title = document.createElement("span");

    title.textContent = todo.title;

    todoListElement.setAttribute("class", "todo-list-element");

    completed.setAttribute("class", "box");
    completed.setAttribute("type", "checkbox");
    completed.setAttribute("disabled", true);

    if (todo.completed === true) {
      completed.setAttribute("checked", "checked");
    }

    title.setAttribute("class", "todo-list-element-title");

    todoListElement.appendChild(completed);
    todoListElement.appendChild(title);
    divTodoContainer.appendChild(todoListElement);

    select.style.display = "inline-block";
  });
};

const changeButtonText = () => {
  if (inputSearch.value) {
    btn.textContent = "SEARCH";
  } else {
    btn.textContent = "FETCH ALL";
  }
};

btn.addEventListener("click", getAllTodos);
inputSearch.addEventListener("keyup", changeButtonText);
select.addEventListener("change", function filterRecords(e) {
  const todoListElements = document.querySelectorAll(".todo-list-element");

  todoListElements.forEach((todoListElement) => {
    todoListElement.style.display = "none";
    if (e.target.value === "completed" && todoListElement.firstChild.checked === true) {
      todoListElement.style.display = "block";
    } else if (e.target.value === "not completed" && todoListElement.firstChild.checked === false) {
      todoListElement.style.display = "block";
    } else if (e.target.value === "all") {
      todoListElement.style.display = "block";
    }
  });
});
