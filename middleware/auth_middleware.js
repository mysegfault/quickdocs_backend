const jwt = require('jsonwebtoken')
require('dotenv').config();


exports.verifyToken = (req, res, next) => {
    
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send("Forbidden");
    }

    // console.log(req.headers)
    token = token.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
    return next();
}