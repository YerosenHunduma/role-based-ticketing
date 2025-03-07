import catchAsyncError from '../middleware/catchAsyncError';
import ticketModel from '../model/ticket/ticket.model';
import { errorHandler } from '../utils/errorHandler';

export const createTicket = catchAsyncError(async (req, res, next) => {
    const { title, description } = req.body;

    const ticket = new ticketModel({ title, description, createdBy: req.userId });

    await ticket.save();
    res.status(200).json({ message: 'User registered successfully', ticket });
});

export const getAllTickets = catchAsyncError(async (req, res, next) => {
    const tickets = req.role === 'admin' ? await ticketModel.find().populate('createdBy') : await ticketModel.find({ createdBy: req.userId });
    res.status(200).json(tickets);
});

export const updateTicket = catchAsyncError(async (req, res, next) => {
    const { status } = req.body;

    const ticket = await ticketModel.findById(req.params.id);

    if (!ticket) return next(new errorHandler('Ticket not found', 400));

    ticket.status = status;
    await ticket.save();
    res.status(200).json({ message: 'Ticket updated successfully', ticket });
});
