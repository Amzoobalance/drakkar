const { createWriteStream } = require("fs");
const { join } = require("path");

const uploadFileHandler = (req, res) => {
  if (req.hasError) {
    return;
  }
  const outputFilePath = join(
    __dirname,
    "../../../files",
    req.headers["file-path"]
  );
  const writeStream = createWriteStream(outputFilePath);
  req.pipe(writeStream).on("finish", () => res.end());
};

module.exports = {
  uploadFileHandler,
};
