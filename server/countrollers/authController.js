
const bcrypt = require('bcryptjs');
const User = require('../model/User.js');
const { jwtSign } = require('../utils/genToken.js');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Enter a correct email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Enter a correct password" });

        jwtSign(res,user);


    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"});
    }
}

const register=async (req,res) => {
    try {
        const {username,email,password}=req.body;
        let user =await User.findOne({email});
        if(user) return res.status(400).json({msg:"Email already exit"});

        user= new User({username,email,password: await bcrypt.hash(password,10)});
        user.save();
        
        jwtSign(res,user)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"});
    }
    
}

module.exports={register,login}
