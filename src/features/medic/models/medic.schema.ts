import { IMedicDocument } from '../interfaces/medicDocument.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const medicSchema: Schema = new Schema({
  authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' },
  phoneNumber: { type: String, default: '' },
  school: { type: String, default: ' ' },
  location: { type: String, default: '' }
});
const MedicModel: Model<IMedicDocument> = model<IMedicDocument>('Medic', medicSchema, 'Medic');
export { MedicModel };
