const jwt = require('jsonwebtoken')


auth= (req, res, next) =>{
    const token = req.header('auth-token')

    if (!token) return res.status(401).send({error: "invalid"})

    try {
        const verified = jwt.verify(token,"token")
        req.user=verified
        next()
    } catch (e) {
        return res.status(400).send({error: "invalid"})
    }
}

module.exports={
    auth
}
