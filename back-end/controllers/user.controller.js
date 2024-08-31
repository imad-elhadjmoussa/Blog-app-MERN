require('dotenv').config();
require('express-async-errors');
const User = require('./../modules/user.schema');
const bcrypt = require('bcrypt');
const CustomError = require('./../utils/CustomError');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const register = async (req, res) => {
    const { username, email, password, avatar } = req.body;
    console.log(req.body);
    const emptyFields = Object.keys(req.body).filter(key => req.body[key] === '' && key !== 'avatar');
    if (emptyFields.length > 0) {
        const fieldsList = emptyFields.join(', ');
        throw new CustomError(`The fields are required: ${fieldsList}`, 400);
    }
    if (!validator.isEmail(email)) {
        throw new CustomError('Invalid email', 400);
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new CustomError('Email already exists ', 400);
    }
    if (!validator.isStrongPassword(password)) {
        throw new CustomError('Password is not strong', 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, password: hashedPassword, avatar });
    const token = jwt.sign({ id: user._id, email: user.email, username: user.username, avatar: user.avatar }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(201).json({ message: 'User created', data: { user: { username: user.username, avatar: user.avatar, email: user.email, id: user._id } }, success: "succuss" });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError('Email not exist', 404);
    } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id, email: user.email, username: user.username, avatar: user.avatar }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.status(200).cookie("token", token).json({ message: 'Login success', data: { user: { username: user.username, avatar: user.avatar, email: user.email, id: user._id } }, success: "succuss" });
        } else {
            throw new CustomError('Invalid password', 401);
        }
    }
}

const profile = async (req, res) => {
    res.status(200).json({ message: 'Profile', data: { user: req.user }, success: "succuss" });
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new CustomError('User not found', 404);
    }
    res.status(200).json({ message: 'User found', data: { user }, success: "succuss" });
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout success', success: "succuss" });
}



module.exports = {
    register,
    login,
    profile,
    logout,
    getUser
};