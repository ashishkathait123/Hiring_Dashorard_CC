const asyncHandler = (handle)=>{
    return (req, res, next)=>{
        Promise.resolve(handle(req, res, next)).catch((error)=>next(error))
    } 
}

export  {asyncHandler};