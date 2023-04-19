// import * as platform from 'os';
import {Run} from '../wandb_run.js';
import {WBValue} from './wb_value.js';

// const SYS_PLATFORM = platform.platform();

export abstract class Media extends WBValue {
  protected _path?: string;

  protected _run?: Run;

  protected _caption?: string;

  protected _isTmp?: boolean;

  protected _extension?: string;

  protected _sha256?: string;

  protected _size?: number;

  constructor(caption?: string) {
    super();
    this._path = undefined;
    this._run = undefined;
    this._caption = caption;
  }

  protected _setFile(path: string, extension?: string, isTmp = false): void {
    this._path = path;
    this._isTmp = isTmp;
    this._extension = extension;

    // Replace with appropriate file reading and hashing method in TypeScript/Node.js
  }

  static getMediaSubdir(): string {
    throw new Error('getMediaSubdir() not implemented for this media type');
  }

  static captions(mediaItems: Media[]): boolean | Array<string | undefined> {
    if (mediaItems[0]._caption !== undefined) {
      return mediaItems.map(m => m._caption);
    }
    return false;
  }

  isBound(): boolean {
    return this._run !== undefined;
  }

  fileIsSet(): boolean {
    return this._path !== undefined && this._sha256 !== undefined;
  }

  /* run: Run,
    key: number | string,
    step: number | string,
    id_?: number | string,
    ignoreCopyErr?: boolean */
  bindToRun(): void {
    throw new Error('NotImplementedError');
  }

  toJSON(_?: Run): Record<string, unknown> {
    throw new Error('NotImplementedError');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(_: Record<string, unknown>, __: any): Media {
    throw new Error('NotImplementedError');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isEqual(other: any): boolean {
    return (
      this.constructor.name === other.constructor.name &&
      this._sha256 != null &&
      other._sha256 === this._sha256
    );
  }

  static pathIsReference(path?: string): boolean {
    return path != null && path.match(/^(gs|s3|https?):\/\//) != null;
  }
}
