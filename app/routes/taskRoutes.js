const express = require("express");
const TaskController = require("../controllers/TaskController");
const validateTaskData = require("../middlewares/validateData");

const router = express.Router();
const taskController = new TaskController();

router.get("/", (req, res) => {
  const tasks = taskController.getAllTasks();
  res.json(tasks);
});

router.post("/", validateTaskData, (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Se requieren campos obligatorios" });
  }

  const task = taskController.createTask(title, description);
  res.status(201).json(task);
});

router.get("/:id", (req, res) => {
  const taskId = req.params.id;
  const task = taskController.getTaskById(taskId);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.json(task);
});

router.put("/:id", validateTaskData, (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;

  const task = taskController.updateTask(taskId, title, description);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const taskId = req.params.id;

  const result = taskController.deleteTask(taskId);

  if (!result) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.sendStatus(204);
});

module.exports = router;
