import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/User.js'

//protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        // Fallback to cookie
        token = req.cookies.jwt;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ message: 'not authorized! token failed' });
        }
    } else {
        res.status(401).json({ message: 'not authorized! no token' });
    }
})

//admin middleware
const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
         res.status(401).json({message:'not authorized as admin'})
    }
}

export {protect,admin};