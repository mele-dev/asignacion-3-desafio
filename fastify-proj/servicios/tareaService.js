'use strict'

const db = [];

db.push({
    name: 'Pasear al rope',
    description: 'Paseamos el ropeee',
    time: 100
});

db.push({
    name: 'Ir a estudiar',
    description: 'Ir a la maldita UCU D:',
    time: 10
});

export const findAll = async () => {
    return db;
}

export const findById = async (id) => {
    if (id >= db.length || id < 0) {
        throw new Error(`No existe ese id`);
    }
    return db[id];
}

export const createTask = async (task) => {
    db.push(task);
    return task;
}

export const updateTask = async (id, task) => {
    if (id >= db.length || id < 0) {
        throw new Error(`No existe ese id`);
    }

    db[id] = task;
    return task;
}

export const deleteTask = async (id) => {
    if (id >= db.length || id < 0) {
        throw new Error(`No existe ese id`);
    }

    const deletedValue = db[id];
    db.splice(id, 1);
    return deletedValue;
}