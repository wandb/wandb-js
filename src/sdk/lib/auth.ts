import {isNode} from './util.js';
import {config} from './config.js';

export class Auth {
  key?: string;

  timeout?: number;

  constructor(key?: string, timeout?: number) {
    this.key = key || config().API_KEY;
    this.timeout = timeout;
  }

  async ensureKey(host?: string, relogin = false): Promise<string | undefined> {
    if (this.key && !relogin) {
      return this.key;
    }
    if (host == null) {
      // eslint-disable-next-line no-param-reassign
      host = 'https://api.wandb.ai';
    }
    if (isNode()) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      const NetRC = (await import('./netrc.js')).default;
      const netrc = new NetRC();
      if (relogin) {
        this.key = await this.promptKey(host);
      } else {
        try {
          const domain = this.cleanHost(host) || 'api.wandb.ai';
          const {password} = netrc.machines[domain];
          this.key = password;
        } catch {
          this.key = await this.promptKey(host);
          if (this.key != null) {
            netrc.save(this.cleanHost(host) || 'api.wandb.ai', this.key);
          }
        }
      }
    } else {
      const key = sessionStorage.getItem('WANDB_API_KEY');
      if (key == null) {
        this.key = await this.promptKey(host);
      } else if (relogin) {
        this.key = await this.promptKey(host);
      }
      if (this.key != null) {
        sessionStorage.setItem('WANDB_API_KEY', this.key);
      }
    }
    return this.key;
  }

  private cleanHost(host: string) {
    return host.split('://').pop()?.split('/')[0].trimEnd();
  }

  private appHost(host: string) {
    return config().APP_URL || host.replace(/api\.wandb/, 'wandb');
  }

  private validateKey(key: string) {
    const parts = key.split('-');
    // eslint-disable-next-line no-param-reassign
    key = parts[parts.length - 1];
    if (key.length !== 40) {
      return false;
    }
    return true;
  }

  async promptKey(host: string): Promise<string | undefined> {
    if (isNode()) {
      if (!process.stdin.isTTY) {
        throw new Error(
          'Cannot prompt for API key, set the WANDB_API_KEY environment variable'
        );
      }
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      return new Promise((resolve, reject) => {
        let timeout: NodeJS.Timeout | null = null;
        if (this.timeout) {
          timeout = setTimeout(() => {
            rl.close();
            reject(new Error('Timed out waiting for API key'));
          }, this.timeout);
        }
        rl.question(
          `Copy your API key from ${this.appHost(host)}/authorize: `,
          (key: string) => {
            rl.close();
            if (!this.validateKey(key)) {
              reject(new Error('Invalid API key, should be 40 characters'));
            }
            if (timeout != null) {
              clearTimeout(timeout);
            }
            resolve(key);
          }
        );
        // TODO: probably want to test this...
        // @ts-expect-error: YOLO
        rl._writeToOutput = () => {
          // @ts-expect-error: YOLO
          rl.output.write('*');
        };
      });
    }
    return new Promise((resolve, reject) => {
      let timeout: NodeJS.Timeout | null = null;
      if (this.timeout) {
        timeout = setTimeout(() => {
          reject(new Error('Timed out waiting for API key'));
        }, this.timeout);
      }
      // TODO: this is not a good idea
      // eslint-disable-next-line no-alert
      const key = prompt(
        `Copy your API key from ${this.appHost(host)}/authorize: `
      );
      if (!this.validateKey(key || '')) {
        reject(new Error('Invalid API key, should be 40 characters'));
      }
      if (timeout != null) {
        clearTimeout(timeout);
      }
      resolve(key || undefined);
    });
  }
}
