const checkAuthorizationHeader = (req, res) => {
    if (!req.headers["authorization"]) {
        res.statusCode = 401;
        req.hasError = true;
    }
};

module.exports = {
    checkAuthorizationHeader
};