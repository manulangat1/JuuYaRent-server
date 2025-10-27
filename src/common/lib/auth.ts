import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Admin } from '../../db/entities/Admin.entity';

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  console.log(password, salt);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  data: Admin,
  password: string,
): Promise<boolean> => {
  return data.password === (await hashPassword(password, data.salt));
};
export const generateRandomOtp = (): string =>
  Math.random().toString().slice(2, 6);

export const generateRandomText = (value: number): string =>
  randomBytes(value).toString('hex');
