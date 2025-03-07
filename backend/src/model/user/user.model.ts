import { Schema, model } from 'mongoose';
import { IUser } from './user.model.type';

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('User', userSchema);
