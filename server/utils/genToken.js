const jwt = require('jsonwebtoken');

const jwtSign = async (res,user) => {
    const playLoad = { user: { id: user.id } };
    jwt.sign(playLoad, process.env.JWT_SECRET, { expiresIn: "7d" }, (error, token) => {
        if (error) throw error;
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    });
}

module.exports={ jwtSign }