import Todo from "./todo.js";
import Project from "./project.js";

// When localStorage is empty, create a default project. Need to add check
const defaultProject = new Project("Default", "This is the default project");