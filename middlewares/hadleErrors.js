const ERROR_HANDLER = {
    ENOENT: res => 
    res.status(404).send([]),
    Error: res=>
    res.status(404).json({"error:": "File Not Found"}),
    JsonWebTokenError: res=>
    res.status(401).json({"error": "Missing token or Invalid Token"}),
    TokenExpiredError: res=>
    res.status(401).json({"error": "Token Expired"}),
    defaultError: res=> 
    res.status(500).end()
}
const errorHandler = (error, req, res, next)=>{
    console.log(error)
    const handler = 
    ERROR_HANDLER[error.code] || ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError
    handler(res, error)
}

module.exports = errorHandler