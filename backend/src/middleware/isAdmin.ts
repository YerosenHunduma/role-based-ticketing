import userModel from '../model/user/user.model';
import { errorHandler } from '../utils/errorHandler';
import catchAsyncError from './catchAsyncError';

export const isAdmin = catchAsyncError(async (req, res, next) => {
    const user = await userModel.findOne({ role: req.role });

    if (user?.role === 'admin') {
        next();
    } else {
        next(new errorHandler('your are not authorized to access this resource', 401));
    }
});
