import { getProjects, createProject, getTodosByProject, addTodo, removeTodo, removeProject } from "./storage.js";

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

        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.textContent = "Delete";
        deleteProjectButton.addEventListener("click", (event) => {
            event.stopPropagation();

            try {
                removeProject(project);
            } catch (error) {
                alert(error.message);
                return;
            }

            if (project === selectedProject) {
                selectedProject = getProjects()[0];
            }

            selectedTodo = null;
            renderProjects();
            renderTodos();
            renderTodoDetails();
        });

        item.appendChild(deleteProjectButton);

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

        const completeButton = document.createElement("button");

        if (todo.completed) {
            item.classList.add("completed");
            completeButton.textContent = "Revert";
        } else {
            completeButton.textContent = "Complete";
        }

        completeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            todo.completed = !todo.completed;
            renderTodos();
            renderTodoDetails();
        });

        item.appendChild(completeButton);

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
        "Completed: " + selectedTodo.completed,
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

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", renderTodoEditForm);
    domTodoDetails.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        removeTodo(selectedTodo);
        selectedTodo = null;
        renderTodos();
        renderTodoDetails();
    });
    domTodoDetails.appendChild(deleteButton);
}

function renderTodoEditForm () {
    domTodoDetails.innerHTML = "";

    const form = document.createElement("form");

    const fields = [
        { name: "title", text: "Title", type: "text", value: selectedTodo.title, required: true },
        { name: "description", text: "Description", type: "text", value: selectedTodo.description, required: false },
        { name: "dueDate", text: "Due date", type: "date", value: selectedTodo.dueDate, required: true }
    ];

    for (const field of fields) {
        const label = document.createElement("label");
        label.textContent = field.text;

        const input = document.createElement("input");
        input.setAttribute("type", field.type);
        input.setAttribute("name", field.name);
        input.value = field.value;

        if (field.required) {
            input.setAttribute("required", "");
        }

        label.appendChild(input);
        form.appendChild(label);
    }

    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority";

    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("name", "priority");

    for (const priority of ["low", "medium", "high"]) {
        const option = document.createElement("option");
        option.setAttribute("value", priority);
        option.textContent = priority;
        prioritySelect.appendChild(option);
    }

    prioritySelect.value = selectedTodo.priority;
    priorityLabel.appendChild(prioritySelect);
    form.appendChild(priorityLabel);

    const saveButton = document.createElement("button");
    saveButton.setAttribute("type", "submit");
    saveButton.textContent = "Save";
    form.appendChild(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.setAttribute("type", "button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", renderTodoDetails);
    form.appendChild(cancelButton);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        try {
            selectedTodo.title = form.elements.title.value;
            selectedTodo.description = form.elements.description.value;
            selectedTodo.dueDate = form.elements.dueDate.value;
            selectedTodo.priority = form.elements.priority.value;
        } catch (error) {
            alert(error.message);
            return;
        }

        renderTodos();
        renderTodoDetails();
    });

    domTodoDetails.appendChild(form);
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
