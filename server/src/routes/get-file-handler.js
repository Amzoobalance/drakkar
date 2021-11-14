const { createReadStream } = require("fs");
const { join } = require("path");

const getFileHandler = (req, res) => {
  if (req.hasError) {
    return;
  }

  const filePath = join(__dirname, "../../../files", req.url);
  const readStream = createReadStream(filePath);

  readStream
    .on("error", () => {
      res.statusCode = 404;
      res.end();
    })
    .pipe(res);
};

module.exports = {
  getFileHandler,
};
