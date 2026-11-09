import { createProject } from "./storage.js";

// When localStorage is empty, create a default project. Need to add check
const defaultProject = createProject("Default", "This is the default project");
