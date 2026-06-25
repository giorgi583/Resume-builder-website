
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    console.log(req.headers.authorization);
let token = req.headers.authorization;
 if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }
if(!token) {
    return res.status(401).json({message: 'Not authorized'});
}
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.userId = decoded.userId;
next();
}
catch(error) {
    console.log(error);
    return res.status(401).json({message: 'Not authorized'});
}
}

export {protect}