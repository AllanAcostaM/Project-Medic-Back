import { Request, Response } from 'express';
import { config } from '@configs/configEnvs';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@services/db/auth.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { medicLoginSchema } from '@auth/schemes/singin';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';

export class SignIn {
  @joiValidation(medicLoginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingMedic: IAuthDocument = await authService.getAuthMedicByUsername(username);
    if (!existingMedic) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch: boolean = await existingMedic.comparePassword(password);
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const medicJwt: string = JWT.sign(
      {
        medicId: existingMedic._id,
        username: existingMedic.username,
        specialty: existingMedic.specialty
      },
      config.JWT_TOKEN!
    );
    req.session = { jwt: medicJwt };
    res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', medic: existingMedic, token: medicJwt });
  }
}
