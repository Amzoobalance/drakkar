const {DRAKKAR_LOGIN, DRAKKAR_PASS} = process.env;

const unifiedCredentials = `${DRAKKAR_LOGIN}:${DRAKKAR_PASS}`
const base64Credentials = Buffer.from(unifiedCredentials).toString('base64');
const expectedAuthorizationHeader = `Basic ${base64Credentials}`

const validateAuthorizationToken = (req, res) => {
    if (req.headers.authorization !== expectedAuthorizationHeader) {
        res.statusCode = 401;
        req.hasError = true;
    }
};

module.exports = {
    validateAuthorizationToken
}