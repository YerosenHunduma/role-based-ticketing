import { model, Schema } from 'mongoose';

const ticketSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default model('Ticket', ticketSchema);
