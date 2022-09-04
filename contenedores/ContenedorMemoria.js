import { v4 as uuidv4 } from "uuid";

class ContenedorMemoria {
    constructor(resource) {
        this.items = [];
        this.resource = resource;
    }

    getAll() {
        return [...this.items];
    }

    getById(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new Error (`[NOT FOUND] ${this.resource} with id ${id} does not exist in our records`);
        }
        return item;
    }

    save(item) {
        const newItem = {
            id: uuidv4(),
            ...item
        }
        this.items.push(newItem);
        return newItem;
    }

    update(item, id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index < 0) {
            throw new Error (`[NOT FOUND] ${this.resource} with id ${id} does not exist in our records`);
        }
        this.items[index] = item;
        return item;
    }

    delete(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index < 0) {
            throw new Error (`[NOT FOUND] ${this.resource} with id ${id} does not exist in our records`);
        }
        return this.items.splice(index, 1);
    }
}

export default ContenedorMemoria