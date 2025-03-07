import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}
