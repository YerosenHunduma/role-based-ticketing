import { Document, ObjectId } from 'mongoose';

export interface ITicket extends Document {
    title: string;
    description: string;
    status: 'Open' | 'InProgress' | 'Closed';
    createdBy: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
