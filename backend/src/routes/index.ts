import { Router } from 'express';
import authRoute from './auth.routes';
import ticketRoute from './ticket.routes';
import globalErrorHandler from '../middleware/globalErrorHandler';

const router = Router();

router.use('/auth', authRoute);
router.use('/ticket', ticketRoute);
router.use(globalErrorHandler);

export default router;
