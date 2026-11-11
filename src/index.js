import { createProject } from "./storage.js";
import { renderProjects, renderTodos } from "./dom.js";

// When localStorage is empty, create a default project. Need to add check
createProject("Default", "This is the default project");
renderProjects();
renderTodos();
