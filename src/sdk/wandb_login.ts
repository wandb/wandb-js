import {Auth} from './lib/auth.js';

export type LoginArgs = {
  key?: string;
  host?: string;
  relogin?: boolean;
  timeout?: number;
};

export async function login(opts: LoginArgs) {
  const auth = new Auth(opts.key, opts.timeout);
  const key = await auth.ensureKey(opts.host, opts.key != null && opts.relogin);
  if (key == null) {
    throw new Error('No API key found');
  }
  return key;
}
