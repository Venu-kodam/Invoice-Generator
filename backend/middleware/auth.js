// import jwt from 'jsonwebtoken'

// const authUser = async (req, res, next) => {
//     const { token } = req.headers
//     if (!token) {
//         return res.json({ success: false, message: "Not authorized to login" })
//     }
//     try {
//         //decode the token
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
//         if (tokenDecode.id) {      //if id is available, add id in req.body
//             req.userId = tokenDecode.id
//         }
//         else {
//             return res.json({ success: false, message: "Not authorized to login" })
//         }
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }
// export default authUser

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeader = req.headers["authorization"]; // check Authorization header
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Not authorized to login" });
    }

    // Token will be in format "Bearer <token>"
    const token = authHeader.split(" ")[1];

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.userId = tokenDecode.id; // attach userId to request
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not authorized to login" });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authUser;
