const { createServer } = require("http");
const { uploadFileHandler } = require("./src/routes/upload-file-handler");
const { getFileHandler } = require("./src/routes/get-file-handler");
const {
  defaultRequestHandler,
} = require("./src/routes/default-request-handler");

const { Router } = require("./src/router");

const {
  checkAuthorizationHeader,
} = require("./src/middleware/check-authorization-header");
const {
  checkFilePathHeader,
} = require("./src/middleware/check-file-path-header");
const { setHeader } = require("./src/middleware/set-header");
const {
  validateAuthorizationToken,
} = require("./src/middleware/validate-authorization-token");
const { ignoreOnError } = require("./src/utils/ignore-on-error");
const { endResponse } = require("./src/middleware/end-response");

const { DRAKKAR_PORT } = process.env;

const authValidations = [
  setHeader("www-authenticate", "Basic"),
  checkAuthorizationHeader,
  ignoreOnError(validateAuthorizationToken),
];

const router = Router()
  .post("/upload", [
    ...authValidations,
    ignoreOnError(checkFilePathHeader),
    endResponse,
    ignoreOnError(uploadFileHandler),
  ])
  .post(defaultRequestHandler)
  .get([
    // ...authValidations,
    // endResponse,
    ignoreOnError(setHeader("content-type", "text/html")),
    ignoreOnError(setHeader("content-encoding", "gzip")),
    ignoreOnError(getFileHandler),
  ])
  .put(defaultRequestHandler)
  .patch(defaultRequestHandler)
  .delete(defaultRequestHandler)
  .head(defaultRequestHandler)
  .options(defaultRequestHandler);

const server = createServer(router.serve);

server.listen(DRAKKAR_PORT);

console.log(`Server started on port ${DRAKKAR_PORT}`);
