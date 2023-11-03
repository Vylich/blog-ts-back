import mongoose from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

interface IEvent extends DocumentResult<IEvent> {
  _id: any;
  email: string;
  passwordHash: string;
  avatarUrl: number;
}

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: String,

}, {
  timestamps: true,
});

export default mongoose.model<IEvent>('User', UserSchema);