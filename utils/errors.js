// classes inherited from Error will react like :

const handleError = (err, req, res, next) => {
//    for 404 errors :
    /*
    if (err instanceof NotFoundError) {
    res
        .status(404)
        .render('error', { message: 'Not Found', });
        return;
    }
     */
    console.error(err);
    res
        .status(err instanceof ValidationError ? 400 : 500) //if err is instanceof class ValidationError send 400 if
    // not send 500
    res.render('error.hbs', {
        message: err instanceof ValidationError ? err.message : 'Sorry, we are working on same issue ',
    });//err.message = risk of safety issues soo we are checking if we know this error = instanceof// if not send err.message
};

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

module.exports = {
    handleError,
    ValidationError,
}
