const jwt=require('jsonwebtoken');


module.exports=function (req,res,next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.status(401).json({mess:"no token"});


    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded.user;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({mess:"Token is not valid"})
    }
}