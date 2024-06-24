const notFoundHandler = (req, res) => {
    res.status(404).send({
        code: 404,
        status: "Not Found",
        message: `Not found`
    });
}

module.exports = notFoundHandler;