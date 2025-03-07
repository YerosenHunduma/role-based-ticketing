import { model, Schema } from 'mongoose';
import { ITicket } from './ticket.model.type';

const ticketSchema = new Schema<ITicket>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['Open', 'InProgress', 'Closed'], default: 'Open' },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Ticket', ticketSchema);
