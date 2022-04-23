class BaseError extends Error {
    name
    httpCode
    isOperational

    constructor(name, httpCode, description, isOperational) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name
        this.httpCode = httpCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}

const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
}

class APIError extends BaseError {
    constructor(
        name,
        httpCode = HttpStatusCode.INTERNAL_SERVER,
        isOperational = true,
        description = 'internal server error'
    ) {
        super(name, httpCode, isOperational, description)
    }
}

class HTTP400Error extends BaseError {
    constructor(description = 'bad request') {
        super('NOT FOUND', HttpStatusCode.BAD_REQUEST, true, description)
    }
}

class HTTP404Error extends BaseError {
    constructor(description = '404 NOT FOUND') {
        super('NOT FOUND', HttpStatusCode.NOT_FOUND, true, description)
    }
}

module.exports = Error
