import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IMedicDocument extends Document {
  _id: string | ObjectId;
  authId: string | ObjectId;
  username?: string;
  password?: string;
  specialty?: string;
  location: string;
  phoneNumber: string;
  school: string;
  createdAt?: Date;
}
