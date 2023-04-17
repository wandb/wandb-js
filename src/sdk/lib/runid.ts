import {randomBytes} from 'crypto';

export function generateId(length: number = 8): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // There are ~2.8T base-36 8-digit strings. If we generate 210k ids,
  // we'll have a ~1% chance of collision.
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor((randomBytes(1)[0] / 256) * alphabet.length);
    result += alphabet[randomIndex];
  }

  return result;
}
