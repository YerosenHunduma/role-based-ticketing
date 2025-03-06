import jwt from 'jsonwebtoken';
export const issueJWT = (userId: string, userRole: string) => {
    return jwt.sign({ _id: userId, role: userRole }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};
