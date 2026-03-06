export class ErrorManager{
    static generateError(message, type, detail, code=400, user){
        let error=new Error(message, {cause: detail})
        error.name=type
        error.custom=true
        error.code=code
        error.user=user

        throw error
    }
}

