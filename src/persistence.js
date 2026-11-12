import { createProject, addTodo, getProjects, getTodos } from "./storage.js";
import { setProjectHighestId } from "./project.js";
import { setTodoHighestId } from "./todo.js";

function saveToLocalStorage(name, data) {
	if (typeof name !== "string" || typeof data !== "string") {
		throw new Error("Name and data needs to be a string");
	}
	localStorage.setItem(name, data);
}

function stringifyProjects() {
	const projects = [];
	for (const singleProject of getProjects()) {
		const projectObject = {
			title: singleProject.title,
			description: singleProject.description,
			id: singleProject.id,
		};
		projects.push(projectObject);
	}
	return JSON.stringify(projects);
}

function stringifyTodos() {
	const todos = [];
	for (const singleTodo of getTodos()) {
		const todoObject = {
			title: singleTodo.title,
			description: singleTodo.description,
			dueDate: singleTodo.dueDate,
			priority: singleTodo.priority,
			projectId: singleTodo.projectId,
			checklist: singleTodo.checklist,
			id: singleTodo.id,
			completed: singleTodo.completed,
		};
		todos.push(todoObject);
	}
	return JSON.stringify(todos);
}

export function save() {
	saveToLocalStorage("projects", stringifyProjects());
	saveToLocalStorage("todos", stringifyTodos());
}

export function load() {
	const loadedResult = {};
	try {
		loadedResult.projects = JSON.parse(localStorage.getItem("projects"));
	} catch {
		loadedResult.projects = [];
	}

	try {
		loadedResult.todos = JSON.parse(localStorage.getItem("todos"));
	} catch {
		loadedResult.todos = [];
	}

	if (!Array.isArray(loadedResult.projects)) {
		loadedResult.projects = [];
	}
	if (!Array.isArray(loadedResult.todos)) {
		loadedResult.todos = [];
	}

	for (const data in loadedResult) {
		for (const object of loadedResult[data]) {
			try {
				if (data === "projects") {
					setProjectHighestId(object.id - 1);
					createProject(object.title, object.description);
				}
				if (data === "todos") {
					setTodoHighestId(object.id - 1);
					const todo = addTodo(
						object.title,
						object.description,
						object.dueDate,
						object.priority,
						object.projectId,
						object.checklist,
					);
					todo.completed = object.completed;
				}
			} catch {
				continue;
			}
		}
	}
	return getProjects().length > 0;
}
