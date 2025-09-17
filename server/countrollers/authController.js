const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User.js');

const jwtSign = async (res,user) => {
    const playLoad = { user: { id: user.id } };
    jwt.sign(playLoad, process.env.JWT_SECRET, { expiresIn: "7d" }, (error, token) => {
        if (error) throw error;
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    });
}




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ mess: "Enter a correct email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ mess: "Enter a correct password" });

        jwtSign(res,user);


    } catch (error) {
        console.log(error);
        res.status(500).json({mess:"server error"});
    }
}

const register=async (req,res) => {
    try {
        const {username,email,password}=req.body;
        let user =await User.findOne({email});
        if(user) return res.status(400).json({mess:"Email already exit"});

        user= new User({username,email,password: await bcrypt.hash(password,10)});
        user.save();
        
        jwtSign(res,user)
    } catch (error) {
        onsole.log(error);
        res.status(500).json({mess:"server error"});
    }
    
}

module.exports={register,login}