type CustomErrorData = {
    data: {
        reason: string
    }
}

export interface CustomError extends Error {
    response: CustomErrorData
}   