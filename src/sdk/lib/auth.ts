import {isNode} from './util.js';

export class Auth {
  key?: string;
  timeout?: number;

  constructor(key?: string, timeout?: number) {
    this.key = key || process.env.WANDB_API_KEY;
    this.timeout = timeout;
  }

  async ensureKey(
    host?: string,
    relogin: boolean = false
  ): Promise<string | undefined> {
    if (this.key && !relogin) {
      return this.key;
    }
    if (host == null) {
      host = 'https://api.wandb.ai';
    }
    if (isNode()) {
      const NetRC = require('./netrc').default;
      const netrc = new NetRC();
      if (relogin) {
        this.key = await this.promptKey(host);
      } else {
        try {
          const domain = this.cleanHost(host);
          const {password} = netrc.machines[domain];
          this.key = password;
        } catch {
          this.key = await this.promptKey(host);
          if (this.key != null) {
            netrc.save(this.cleanHost(host), this.key);
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
    return host.replace(/https?:\/\//, '').replace(/[\/ ]+$/, '');
  }

  private appHost(host: string) {
    return process.env.WANDB_APP_URL || host.replace(/api\.wandb/, 'wandb');
  }

  private validateKey(key: string) {
    const parts = key.split('-');
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
      const readline = require('readline');
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
        rl._writeToOutput = function () {
          rl.output.write('*');
        };
      });
    } else {
      return new Promise((resolve, reject) => {
        let timeout: NodeJS.Timeout | null = null;
        if (this.timeout) {
          timeout = setTimeout(() => {
            reject(new Error('Timed out waiting for API key'));
          }, this.timeout);
        }
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
}
