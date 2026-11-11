import { getProjects, createProject } from "./storage.js";

const domProjectList = document.querySelector("#project-list");
const domProjectForm = document.querySelector("#project-form");
const domTodosHeading = document.querySelector("#todos-heading");

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
