const { constants } = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORISED:
            res.json({ title: "Unauthorised error", message: err.message, stackTrace: err.stack });
        case constants.FORBIDEN:
            res.json({ title: "forbidden", message: err.message, stackTrace: err.stack });
        case constants.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack });
        case constants.SERVER_ERROR:
            res.json({ title: "servr error", message: err.message, stackTrace: err.stack });
        default:
        console.log("All GOOD NO error!!!!!!!!!!")
            break;
    }



}
module.exports = errorHandler;