import { body } from 'express-validator';

export const registrationValidator = [
    body('username').trim().notEmpty().withMessage('First name field is required'),
    body('role').notEmpty().withMessage('role field is required').isIn(['local', 'foreign']).withMessage('role must be either "Admin" or "User"'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords must match')
];
