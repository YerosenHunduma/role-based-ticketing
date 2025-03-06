import { Router } from 'express';
import * as ticket from '../controller/ticket.controller';
import { isAuthenticated } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';
import { createTicketValidator } from '../validator/ticketValidator';

const router = Router();

router.post('/create-ticket', isAuthenticated, createTicketValidator, ticket.createTicket);
router.get('/get-all-ticket', isAuthenticated, ticket.getAllTickets);
router.put('/update-ticket/:id', isAuthenticated, isAdmin, ticket.updateTicket);

export default router;
