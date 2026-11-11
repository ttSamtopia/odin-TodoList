import { getProjects, createProject } from "./storage.js";

const domProjectList = document.querySelector("#project-list");
const domProjectForm = document.querySelector("#project-form");
const domTodosHeading = document.querySelector("#todos-heading");


export function renderProjects () {
    projectList.innerHTML = "";

    for (const project of getProjects()) {
        const item = document.createElement("li");
        item.textContent = project.title;
        projectList.appendChild(item);
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
