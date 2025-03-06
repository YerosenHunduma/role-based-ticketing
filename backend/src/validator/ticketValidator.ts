import { body } from 'express-validator';

export const createTicketValidator = [
    body('title').trim().notEmpty().withMessage('Title field is required'),
    body('description').trim().notEmpty().withMessage('Description field is required'),
    body('status').notEmpty().withMessage('Status field is required').isIn(['Open', 'In Progress', 'Closed']).withMessage('Status must be either "Open", "In Progress", or "Closed"')
];
