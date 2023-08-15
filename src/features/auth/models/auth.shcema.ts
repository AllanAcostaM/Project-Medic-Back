import { compare } from 'bcryptjs';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';
import { model, Model, Schema } from 'mongoose';

const authSchema: Schema = new Schema(
  {
    username: { type: 'String' },
    password: { type: 'String' },
    specialty: { type: 'String' },
    createdAt: { type: Date, default: Date.now() }
  },

  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as IAuthDocument).password!;
  return compare(password, hashedPassword);
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };
