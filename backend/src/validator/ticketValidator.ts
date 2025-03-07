import { body } from 'express-validator';

export const createTicketValidator = [body('title').trim().notEmpty().withMessage('Title field is required'), body('description').trim().notEmpty().withMessage('Description field is required')];
