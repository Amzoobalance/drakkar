const setHeader =(key, value) => (req, res) => {
    res.setHeader(key, value);
};

module.exports = {
    setHeader
};