const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await User.create({ 
            ...userData,
            password: hashedPassword
        });
        res.status(200).send(user)
    } catch (error) {
       res.status(400).send({message: 'User already registered!', error: error.message})
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { userId: user.userId },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).send({ token });

    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

exports.getByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const { userName, email, password, photo } = req.body;
        
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const [updated] = await User.update({
            userName, 
            email, 
            password: hashedPassword, 
            photo
        }, {
            where: { userId }
        });

        if (updated) {
            const updatedUser = await User.findByPk(userId);
            return res.status(200).send(updatedUser);
        } else {
            return res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'User update error', error: error.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await User.destroy({
            where: { userId }
        });

        if (deleted) {
            return res.status(200).send({ message: 'User successfully deleted' });
        } else {
            return res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};