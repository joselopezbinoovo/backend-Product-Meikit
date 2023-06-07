const User = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/token');


const login = async (req, res) => {

    try {
        const {
            name,
            password
        } = req.body
        const userValidation = await User.findOne({
            where: {
                name: name
            }
        });
        if (!userValidation) {
            res.status(404).json({
                msg: 'Email no valido'
            })
        }
        const passwordValidation = bcrypt.compareSync(password, userValidation.password);
        if (!passwordValidation) {
            res.status(500).json({
                ok: false,
                msg: 'Password no valido'
            })
        }

        const jwToken = jwt.sign({
            name: userValidation.name
        }, env.secret)
        res.json({
            message: "Logueao!",
            token: jwToken,
            data: userValidation
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: (error, 'Error con el login')
        })
    }
}

module.exports = {
    login
}