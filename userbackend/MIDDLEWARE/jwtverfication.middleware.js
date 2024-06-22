const jwt = require("jsonwebtoken")

const nameOfTheFunction = (req, res, next) => {
    let token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: "token is not provided in the header", message_type: "no_token_provided" })
    }

    jwt.verify(token, 'asios', (err, decode) => {
        if (err) {
            console.log(err)
            return res.json({ message: "token is incorrect", message_type: "incorect_token" })
        }
        next()
    })
}

module.exports = { nameOfTheFunction }