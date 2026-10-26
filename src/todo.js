export default class Todo {
    #completed = false;
    #title;
    #description;
    #dueDate;
    #priority;
    #checklist;
    
    constructor (title, description, dueDate, priority, checklist = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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
