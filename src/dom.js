import { getProjects, createProject, getTodosByProject, addTodo } from "./storage.js";

const domProjectList = document.querySelector("#project-list");
const domProjectForm = document.querySelector("#project-form");
const domTodosHeading = document.querySelector("#todos-heading");
const domTodoList = document.querySelector("#todo-list");
const domTodoForm = document.querySelector("#todo-form");

let selectedProject;

export function renderProjects () {
    domProjectList.innerHTML = "";

    if (selectedProject === undefined) {
        selectedProject = getProjects()[0];
    }

    for (const project of getProjects()) {
        const item = document.createElement("li");
        item.textContent = project.title;

        if (project === selectedProject) {
            item.classList.add("selected");
        }

        item.addEventListener("click", () => {
            selectedProject = project;
            renderProjects();
            renderTodos();
        });

        domProjectList.appendChild(item);
    }

    domTodosHeading.textContent = selectedProject.title;
}

export function renderTodos () {
    domTodoList.innerHTML = "";

    for (const todo of getTodosByProject(selectedProject.id)) {
        const item = document.createElement("li");
        item.textContent = todo.title + " - " + todo.dueDate;

        item.classList.add("priority" + todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1));

        domTodoList.appendChild(item);
    }
}

domProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
        createProject(domProjectForm.elements.title.value, domProjectForm.elements.description.value);
    } catch (error) {
        alert(error.message);
        return;
    }

    domProjectForm.reset();
    renderProjects();
});

domTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
        addTodo(
            domTodoForm.elements.title.value,
            domTodoForm.elements.description.value,
            domTodoForm.elements.dueDate.value,
            domTodoForm.elements.priority.value,
            selectedProject.id
        );
    } catch (error) {
        alert(error.message);
        return;
    }

    domTodoForm.reset();
    renderTodos();
});
