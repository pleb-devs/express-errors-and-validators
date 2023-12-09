const errorHandler = (err, req, res, next) => {
    console.log(err);
    switch(true) {
      default:
        res.status(500).send(err.message);
        break;
    }
}

module.exports = errorHandler;