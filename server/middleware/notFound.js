// catch request that does not match any of the defined routes
const notFoundMiddleware = (req, res) =>
  res.status(404).send("Route does not exist");

export default notFoundMiddleware;
