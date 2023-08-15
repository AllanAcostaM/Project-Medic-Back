import { IAuthDocument } from '@auth/interfaces/authDocument.interface';
import { AuthModel } from '@auth/models/auth.shcema';
import { Generators } from '@helpers/generators/generators';

class AuthService {
  public async getMedicByUsername(username: string): Promise<IAuthDocument> {
    const query = {
      username: Generators.firstLetterUppercase(username)
    };
    const medic: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;
    return medic;
  }

  public async getAuthMedicByUsername(username: string): Promise<IAuthDocument> {
    const medic: IAuthDocument = (await AuthModel.findOne({
      username: Generators.firstLetterUppercase(username)
    }).exec()) as IAuthDocument;
    return medic;
  }
}

export const authService: AuthService = new AuthService();
