"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const todoData = JSON.parse(localStorage.getItem("todoData"));

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      "</span>" +
      '<div class = "todo-buttons" >' +
      '<button class="todo-remove"></button>' +
      '<button class = "todo-complete" > </button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    headerInput.value = "";

    const btnTodoComplete = li.querySelector(".todo-complete");
    const btnTodoRemove = li.querySelector(".todo-remove");

    btnTodoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });

    btnTodoRemove.addEventListener("click", function () {
      todoData.splice(item, 1);
      li.remove();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  if (headerInput.value.trim() !== "") {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };
    todoData.push(newTodo);
    render();
  } else {
    headerInput.value = "";
  }
});

window.onbeforeunload = function () {
  localStorage.todoData = JSON.stringify(todoData);
};

render();
