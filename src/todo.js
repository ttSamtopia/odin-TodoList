export default class Todo {
    #completed = false;
    #title;
    #description;
    #dueDate;
    #priority;
    #projectId;
    #checklist;
    
    constructor (title, description, dueDate, priority, projectId, checklist = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.checklist = checklist;
    }

    

    get completed () {
        return this.#completed;
    }

    set completed (value) {
        if (value !== true && value !== false) {
            throw new Error("Completed must be a boolean value");
        } else {
            this.#completed = value;
        }
    }

    get title () {
        return this.#title;
    }

    set title (value) {
        if (typeof value !== "string" || value === "") {
            throw new Error("Title must be a non-empty string");
        } else {
            this.#title = value;
        }
    }

    get description () {
        return this.#description;
    }

    set description (value) {
        if (typeof value !== "string") {
            throw new Error("Description must be a string");
        } else {
            this.#description = value;
        }
    }

    get dueDate () {
        return this.#dueDate;
    }

    set dueDate (value) {
        // Add more robust date validation later
        if (typeof value !== "string") {
            throw new Error("Due date must be a string");
        } else {
            this.#dueDate = value;
        }
    }

    get priority () {
        return this.#priority;
    }

    set priority (value) {
        if (value !== "low" && value !== "medium" && value !== "high") {
            throw new Error("Priority must be 'low', 'medium', or 'high'");
        } else {
            this.#priority = value;
        }
    }

    get projectId () {
        return this.#projectId;
    }

    set projectId (value) {
        // Add a check to ensure the project exists
        if (!Number.isInteger(value) || value < 1) {
            throw new Error("Project ID must be a positive integer");
        } else {
            this.#projectId = value;
        }
    }

    get checklist () {
        return this.#checklist.slice();
    }

    set checklist (value) {
        if (!Array.isArray(value) || !value.every(item => typeof item === "string")) {
            throw new Error("Checklist must be an array of strings");
        } else {
            this.#checklist = value.slice();
        }
    }
}
