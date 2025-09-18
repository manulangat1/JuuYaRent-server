import { randomBytes } from 'crypto';

export const generateRandomOtp = (): string =>
  Math.random().toString().slice(2, 6);

export const generateRandomText = (value: number): string =>
  randomBytes(value).toString('hex');
