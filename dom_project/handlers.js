export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Server error" });
}

export function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}