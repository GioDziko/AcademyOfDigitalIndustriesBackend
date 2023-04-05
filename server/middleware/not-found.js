const notFound = (req, res) => {
  let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.status(404).json({
    message: `Route ${fullUrl} does not exist`,
    success: false,
  });
};

module.exports = { notFound };
