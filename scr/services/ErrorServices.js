export default class ErrorService {
    static createError({ name = 'Error', cause, message, code = 1, status = 500 }) {
        const error = new Error(message, { cause })
        error.name = name,
            error.code = code,
            error.status = 500

        throw error
    }
}