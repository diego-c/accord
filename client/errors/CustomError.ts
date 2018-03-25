type CustomErrorData = {
    data: {
        reason: string,
        message: string
    }
}

export interface CustomError extends Error {
    response: CustomErrorData
}   