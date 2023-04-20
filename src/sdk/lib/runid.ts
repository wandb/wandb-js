async function generateId(length = 8): Promise<string> {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  let randomBytes: any;
  if (typeof window === 'undefined') {
    randomBytes = (await import('node:crypto')).randomBytes;
  } else {
    randomBytes = (size: number) => {
      const bytes = Buffer.allocUnsafe(size);
      crypto.getRandomValues(bytes);
      return bytes;
    };
  }

  // There are ~2.8T base-36 8-digit strings. If we generate 210k ids,
  // we'll have a ~1% chance of collision.
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor((randomBytes(1)[0] / 256) * alphabet.length);
    result += alphabet[randomIndex];
  }

  return result;
}

export {generateId};
