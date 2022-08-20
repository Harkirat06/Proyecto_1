const jwt = require("jsonwebtoken")

const tokenExtractor = (req, res, next)=>{
    const authorization = req.get("authorization")
    let token = null
    if(authorization && authorization.toLowerCase().startsWith("bearer")){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN)
    } catch (error) {
        next(error)
    }
    
    const {id: userId} = decodedToken

    req.userId = userId

    next()
}
module.exports = tokenExtractor