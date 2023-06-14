const Task = require("../models/Task");

class TaskController {
  constructor() {
    this.tasks = [];
  }

  getAllTasks() {
    return this.tasks;
  }

  createTask(title, description) {
    const task = new Task(title, description);
    this.tasks.push(task);
    return task;
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(id, title, description) {
    const task = this.getTaskById(id);
    if (!task) {
      return null;
    }
    task.title = title || task.title;
    task.description = description || task.description;
    return task;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }
    this.tasks.splice(index, 1);
    return true;
  }
}

module.exports = TaskController;
