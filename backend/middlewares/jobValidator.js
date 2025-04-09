export const validateJob = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    const error = new Error(
      err.errors?.map((e) => e.message).join(', ') || 'Validation error'
    );
    error.statusCode = 400;
    next(error); 
  }
};
