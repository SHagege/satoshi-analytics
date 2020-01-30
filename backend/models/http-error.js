class HttpError extends Error {
    constructor() {
        super(message)
        this.code = errorCode
    }
}

module.exports = HttpError