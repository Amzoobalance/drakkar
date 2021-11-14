const checkFilePathHeader = (req, res) => {
  const path = req.headers["file-path"];
  if (!path) {
    res.statusCode = 400;
    req.hasError = true;
  }
};

module.exports = {
  checkFilePathHeader,
};
