import jwt from "jsonwebtoken"
//we want to authenticate the user before he adds cart items


const authMiddleware = async (req,res,next) => {
    //getting token from the headers
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message: "Not authorized, please login"});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        //we are setting the userId fetched from token, to req.body, so even for getCartData, we should use post method, to access the req.body;
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error, Try logging out, and login again!"});
    }
}

export default authMiddleware;