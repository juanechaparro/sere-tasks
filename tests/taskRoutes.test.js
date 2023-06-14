const request = require("supertest");
const app = require("../app/app");

describe("Task routes", () => {
  test("GET /tasks should return all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test("POST /tasks should create a new task", async () => {
    const taskData = {
      title: "New Task",
      description: "New Task Description",
    };

    const response = await request(app).post("/tasks").send(taskData);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(taskData.title);
    expect(response.body.description).toBe(taskData.description);
  });

  test("PUT /tasks/:id should update an existing task", async () => {
    const taskId = "task_id";
    const updatedTaskData = {
      title: "Updated Task",
      description: "Updated Task Description",
    };

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send(updatedTaskData);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTaskData.title);
    expect(response.body.description).toBe(updatedTaskData.description);
  });

  test("DELETE /tasks/:id should delete an existing task", async () => {
    const taskId = "task_id";

    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(204);
  });
});
