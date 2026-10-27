// Add so this checks against highest in localStorage
let highestId = 0;

export default class Project {
    #title;
    #description;
    #id;

    constructor (title, description) {
        this.title = title;
        this.description = description;
        highestId++;
        this.#id = highestId;
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

    get id () {
        return this.#id;
    }
}