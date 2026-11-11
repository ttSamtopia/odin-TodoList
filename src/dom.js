import { getProjects, createProject, getTodosByProject, addTodo } from "./storage.js";

const domProjectList = document.querySelector("#project-list");
const domProjectForm = document.querySelector("#project-form");
const domTodosHeading = document.querySelector("#todos-heading");
const domTodoList = document.querySelector("#todo-list");
const domTodoForm = document.querySelector("#todo-form");
const domTodoDetails = document.querySelector("#todo-details");

let selectedProject;
let selectedTodo = null;

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
            selectedTodo = null;
            renderProjects();
            renderTodos();
            renderTodoDetails();
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

        item.addEventListener("click", () => {
            selectedTodo = todo;
            renderTodoDetails();
        });

        domTodoList.appendChild(item);
    }
}

function renderTodoDetails () {
    domTodoDetails.innerHTML = "";

    if (selectedTodo === null) {
        return;
    }

    const heading = document.createElement("h3");
    heading.textContent = selectedTodo.title;
    domTodoDetails.appendChild(heading);

    const lines = [
        "Description: " + selectedTodo.description,
        "Due date: " + selectedTodo.dueDate,
        "Priority: " + selectedTodo.priority,
        "Checklist:"
    ];

    for (const line of lines) {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        domTodoDetails.appendChild(paragraph);
    }

    const checklist = document.createElement("ul");

    for (const entry of selectedTodo.checklist) {
        const entryItem = document.createElement("li");
        entryItem.textContent = entry;
        checklist.appendChild(entryItem);
    }

    domTodoDetails.appendChild(checklist);
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
