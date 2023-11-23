let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let savedMsgElement = document.getElementById("save");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (stringifiedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }

}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    
    savedMsgElement.classList.add("saved-msg");
    savedMsgElement.textContent = "Your changes has been saved";
    
};


function onTodoStatusChange(checkboxId, labelId, todoId) {
    savedMsgElement.textContent = "";
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    let todoElement = document.getElementById(todoId);

    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(eachTodo => {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId) {
    savedMsgElement.textContent = "";
    let todoElement = document.getElementById(todoId);

    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(eachTodo => {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (todoId === eachTodoId) {
            return true;
        } else {
            return false;
        }
    });

    let deletedTodoItem = todoList.splice(deleteElementIndex, 1);

}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row","justify-content-center");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);

}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let todoUserInput = document.getElementById("todoUserInput");
    let userInput = todoUserInput.value;
    if (userInput === "") {
        alert("Enter a valid input");
        return;
    }

    todosCount += 1;
    let newTodo = {
        text: userInput,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value = "";

}

addTodoButton.onclick = function() {
    savedMsgElement.textContent = "";
    onAddTodo();
};