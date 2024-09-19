const taskRoutes = require("../routes/task.route");

module.exports = (app) => {
  app.use("/api/v1/tasks", taskRoutes);
};
