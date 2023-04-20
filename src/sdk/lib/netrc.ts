import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {config} from './config.js';

class Machine {
  machine = 'empty';

  login?: string;

  password?: string;

  account?: string;
}

export default class NetRC {
  filename: string;

  machines: {[key: string]: Machine} = {};

  constructor() {
    this.filename = this.defaultFile;
    this.machines = {};
    this.parse();
  }

  private get defaultFile(): string {
    const home =
      (os.platform() === 'win32' && config().WIN_HOME) ||
      os.homedir() ||
      os.tmpdir();
    return path.join(home, os.platform() === 'win32' ? '_netrc' : '.netrc');
  }

  save(hostname: string, key: string) {
    const data = fs.readFileSync(this.filename, 'utf-8');
    let replaced = data;
    if (!this.machines[hostname]) {
      // TODO: windows carriage returns?
      if (!replaced.endsWith('\n')) {
        replaced += '\n';
      }
      replaced += `machine ${hostname}\n`;
      replaced += `  login user\n`;
      replaced += `  password ${key}\n`;
    } else {
      const oldKey = this.machines[hostname].password;
      const regExp = new RegExp(`password\\s+${oldKey}\\n`, 'g');
      replaced = data.replace(regExp, `password ${key}\n`);
    }
    fs.writeFileSync(this.filename, replaced, 'utf-8');
    this.parse();
  }

  host(hostname: string) {
    if (!this.machines[hostname])
      this.error(`Machine ${hostname} not found in ${this.filename}`);
    return this.machines[hostname];
  }

  parse() {
    this.machines = {};
    if (!fs.existsSync(this.filename)) {
      return;
    }

    let data = fs.readFileSync(this.filename, 'utf-8');

    // Remove comments
    const lines = data.split('\n');
    lines.forEach((line, idx) => {
      const i = line.indexOf('#');
      if (i > -1) lines[idx] = line.substring(0, i);
    });
    data = lines.join('\n');

    const tokens = data.split(/[ \t\n\r]+/);
    let machine = new Machine();
    tokens.forEach((token, i) => {
      if (token === 'machine') {
        machine = new Machine();
        machine.machine = this.unescape(tokens[i + 1]);
        this.machines[machine.machine] = machine;
      } else if (token === 'password') {
        machine.password = this.unescape(tokens[i + 1]);
      }
    });

    this.machines[machine.machine] = machine;
  }

  // Allow spaces and other weird characters in passwords by supporting \xHH
  unescape(s: string) {
    const match = /\\x([0-9a-fA-F]{2})/.exec(s);
    let escaped = s;
    if (match) {
      escaped =
        s.substring(0, match.index) +
        String.fromCharCode(parseInt(match[1], 16)) +
        s.substring(match.index + 4);
    }
    return escaped;
  }

  error(message: string) {
    console.error('netrc: Error:', message);
    throw new Error(`netrc: Error: ${message}`);
  }
}
