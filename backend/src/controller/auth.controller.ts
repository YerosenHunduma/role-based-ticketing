import bcrypt from 'bcryptjs';
import { errorHandler } from './../utils/errorHandler';
import catchAsyncError from '../middleware/catchAsyncError';
import userModel from '../model/user/user.model';
import { hashedPassword } from '../utils/hashPassword';
import { validationResult } from 'express-validator';
import { issueJWT } from '../utils/signToken';

export const signup = catchAsyncError(async (req, res, next) => {
    const { username, password, role } = req.body;

    console.log(req.body);

    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     const errorMessage = error.array().map((err) => err.msg);
    //     return next(new errorHandler(errorMessage[0], 400));
    // }

    const user = await userModel.findOne({ username });
    if (user) return next(new errorHandler('User already exists', 400));

    const hashedP = await hashedPassword(password);

    new userModel({ username, password: hashedP, role }).save();

    return res.status(201).json({ message: 'User registered successfully' });
});

export const login = catchAsyncError(async (req, res, next) => {
    const { username, password } = req.body;

    const existinguser = await userModel.findOne({ username });

    if (!existinguser) return next(new errorHandler('Invalid credentials', 400));

    const isMatch = await bcrypt.compare(password, existinguser.password);

    if (!isMatch) return next(new errorHandler('Invalid credentials', 400));

    const token = issueJWT(existinguser.id, existinguser.role);

    const { password: userPassword, ...user } = existinguser.toObject();

    res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
        .status(200)
        .json(user);
});

export const logout = catchAsyncError(async (req, res, next) => {
    res.cookie('access_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({ message: 'Successfully signed out' });
});
