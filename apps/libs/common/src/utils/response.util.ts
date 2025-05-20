export function successResponse(returnCode : number, returnCodeDescription: string, data?: any){
    return {
        returnCode,
        returnCodeDescription,
        data
    }
}

export function errorResponse(returnCode: number, returnCodeDescription: string, error?: any){
     return {
        returnCode,
        returnCodeDescription,
        error
    }
}