import { createProject } from "./storage.js";
import { renderProjects, renderTodos } from "./dom.js";
import { load } from "./persistence.js";

if (!load()) {
	createProject("Default", "This is the default project");
}
renderProjects();
renderTodos();
