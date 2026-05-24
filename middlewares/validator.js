const Joi = require("joi");

const validateTodo = (req, res, next) => {
  console.log("Running todo validator middleware");

  const schema = Joi.object({
    task: Joi.string().min(3).max(100).required(),
    completed: Joi.boolean().default(false),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log("Error on validating todo", error);
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = validateTodo;
