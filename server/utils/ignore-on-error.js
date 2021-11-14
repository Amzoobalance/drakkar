const ignoreOnError = (handler) => (req, res) => {
    if (!req.hasError) {
        handler(req, res);
    }
};

module.exports = {
    ignoreOnError,
}