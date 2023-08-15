import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';
import { config } from '@configs/configEnvs';
import { ISignUpData } from '@auth/interfaces/singUpData.interface';
import { Generators } from '@helpers/generators/generators';
import { IMedicDocument } from '@root/features/medic/interfaces/medicDocument.interface';

export abstract class SignUpUtility {
  protected signToken(data: IAuthDocument, medicObjectId: ObjectId): string {
    return JWT.sign(
      {
        medicId: medicObjectId,
        username: data.username,
        specialty: data.specialty
      },
      config.JWT_TOKEN!
    );
  }
  protected signUpData(data: ISignUpData): IAuthDocument {
    const { _id, username, password, specialty } = data;
    return {
      _id,
      username: Generators.firstLetterUppercase(username),
      password,
      specialty,
      createdAt: new Date()
    } as IAuthDocument;
  }
  protected medicData(data: IAuthDocument, medicObjectId: ObjectId): IMedicDocument {
    const { _id, username, password, specialty } = data;
    return {
      _id: medicObjectId,
      authId: _id,
      username: Generators.firstLetterUppercase(username),
      password,
      specialty,
      location: '',
      school: '',
      phoneNumber: ''
    } as unknown as IMedicDocument;
  }
}
