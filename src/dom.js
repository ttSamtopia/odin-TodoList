import { getProjects, createProject } from "./storage.js";

const projectList = document.querySelector("#project-list");

export function renderProjects () {
    projectList.innerHTML = "";

    for (const project of getProjects()) {
        const item = document.createElement("li");
        item.textContent = project.title;
        projectList.appendChild(item);
    }
}

