import bcrypt from 'bcryptjs';
import { config } from '@configs/configEnvs';

export class Generators {
  static firstLetterUppercase(str: string): string {
    const valueString = str.toLowerCase();
    return valueString
      .split(' ')
      .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase}`)
      .join(' ');
  }

  static parseJson(prop: string) {
    try {
      JSON.parse(prop);
    } catch (error) {
      return prop;
    }
    return JSON.parse(prop);
  }

  static hash(password: string): Promise<string> {
    return bcrypt.hash(password, Number(config.SALT_ROUND));
  }
}
