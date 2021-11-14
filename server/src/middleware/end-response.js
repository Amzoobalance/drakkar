const endResponse = (req, res) => {
    if (req.hasError) {
        res.end();
    }
}

module.exports = {
    endResponse,
};