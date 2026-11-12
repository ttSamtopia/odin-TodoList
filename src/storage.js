import Project from "./project.js";
import Todo from "./todo.js";

const projects = [];
const todos = [];

export function createProject(title, description) {
	for (const project of projects) {
		if (project.title === title) {
			throw new Error("Project with this title already exists");
		}
	}

	const project = new Project(title, description);
	projects.push(project);
	return project;
}

export function addTodo(
	title,
	description,
	dueDate,
	priority,
	projectId,
	checklist,
) {
	const project = projects.find((project) => project.id === projectId);

	if (project === undefined) {
		throw new Error("No project exists with chosen projectId");
	}

	const todo = new Todo(
		title,
		description,
		dueDate,
		priority,
		projectId,
		checklist,
	);
	todos.push(todo);
	return todo;
}

export function getTodosByProject(projectId) {
	return todos.filter((todo) => todo.projectId === projectId);
}

export function removeTodo(todo) {
	const index = todos.indexOf(todo);

	if (index === -1) {
		throw new Error("Todo is not in the list");
	}

	todos.splice(index, 1);
}

export function moveTodo(todo, projectId) {
	const project = projects.find((p) => p.id === projectId);

	if (project === undefined) {
		throw new Error("No project exists with chosen projectId");
	}
	todo.projectId = projectId;
}

export function removeProject(project) {
	const index = projects.indexOf(project);

	if (index === -1) {
		throw new Error("Project is not in the list");
	} else if (index === 0) {
		throw new Error("Can't delete default project");
	}

	const deletedProjectsTodos = getTodosByProject(project.id);
	deletedProjectsTodos.forEach((todo) => moveTodo(todo, projects[0].id));

	projects.splice(index, 1);
}

export function getProjects() {
	return projects.slice();
}

export function getTodos() {
	return todos.slice();
}
