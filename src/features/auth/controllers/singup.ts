import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { medicSignupSchema } from '@auth/schemes/singup';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';
import { authService } from '@services/db/auth.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { Generators } from '@helpers/generators/generators';
import HTTP_STATUS from 'http-status-codes';
import { SignUpUtility } from './utilities/singup.utility';

export class SignUp extends SignUpUtility {
  @joiValidation(medicSignupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, password, specialty } = req.body;
    const checkIfMedicExist = await authService.getMedicByUsername(username);
    if (checkIfMedicExist) {
      throw new BadRequestError('Invalid credentials for this medic user');
    }

    const authObjectId: ObjectId = new ObjectId();
    const medicObjectId: ObjectId = new ObjectId();
    const passwordHash = await Generators.hash(password);
    const authData: IAuthDocument = SignUp.prototype.signUpData({
      _id: authObjectId,
      username,
      password: passwordHash,
      specialty
    });

    const medicJwt: string = SignUp.prototype.signToken(authData, medicObjectId);
    req.session = { jwt: medicJwt };

    const medicDataForResponse = {
      _id: medicObjectId,
      username,
      specialty
    };

    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: 'User created successfully', medic: medicDataForResponse, token: medicJwt });
  }
}
