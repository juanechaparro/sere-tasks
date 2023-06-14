function validateTaskData(req, res, next) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Se requieren campos obligatorios" });
  }

  next();
}

module.exports = validateTaskData;
