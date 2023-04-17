import {Run} from '../wandb_run.js';

type TypeMappingType = {[key: string]: typeof WBValue};

export class WBValue {
  // Class Attributes
  private static _typeMapping: TypeMappingType | null = null;

  protected static _logType: string | null = null;

  // Instance Attributes
  // TODO: types for artifacts
  private _artifactSource: any | null;

  private _artifactTarget: any | null;

  constructor() {
    this._artifactSource = null;
    this._artifactTarget = null;
  }

  toJSON(_?: Run): object {
    throw new Error('NotImplementedError');
  }

  // TODO: type for artifact
  static fromJSON(_: object, __: any): WBValue {
    throw new Error('NotImplementedError');
  }

  static withSuffix(name: string, filetype = 'json'): string {
    const suffix = this._logType ? `${this._logType}.${filetype}` : filetype;
    return name.endsWith(suffix) ? name : `${name}.${suffix}`;
  }

  static initFromJson(jsonObj: any, sourceArtifact: any): WBValue | null {
    const classOption = WBValue.typeMapping()[jsonObj._type];
    if (classOption) {
      const obj = classOption.fromJSON(jsonObj, sourceArtifact);
      obj._setArtifactSource(sourceArtifact);
      return obj;
    }
    return null;
  }

  static typeMapping(): TypeMappingType {
    if (!WBValue._typeMapping) {
      WBValue._typeMapping = {};
      const frontier = [WBValue];
      const explored = new Set();

      while (frontier.length > 0) {
        const classOption = frontier.pop();
        if (classOption == null) {
          break;
        }
        explored.add(classOption);
        if (classOption._logType) {
          WBValue._typeMapping[classOption._logType] = classOption;
        }
        // Note: TypeScript does not support __subclasses__()
        // You will have to manually add subclasses to the frontier array
      }
    }
    return WBValue._typeMapping;
  }

  equals(other: object): boolean {
    return this === other;
  }

  notEquals(other: object): boolean {
    return !this.equals(other);
  }

  toDataArray(): any[] {
    throw new Error('NotImplementedError');
  }

  // TODO: type for artifacts
  _setArtifactSource(artifact: any, name?: string): void {
    if (this._artifactSource) {
      throw new Error(
        `Cannot update artifact_source. Existing source: ${this._artifactSource.artifact}/${this._artifactSource.name}`
      );
    }
    // TODO: WBValueArtifactSource
    this._artifactSource = {artifact, name};
  }

  _setArtifactTarget(artifact: any, name?: string): void {
    if (this._artifactTarget) {
      throw new Error(
        `Cannot update artifact_target. Existing target: ${this._artifactTarget.artifact}/${this._artifactTarget.name}`
      );
    }
    // TODO: WBValueArtifactTarget
    this._artifactTarget = {artifact, name};
  }

  _getArtifactEntryRefUrl(): string | null {
    // Note: You'll need to implement the necessary methods for the following classes:
    // - PublicArtifact, LocalArtifact, WBValueArtifactSource, and WBValueArtifactTarget

    if (this._artifactSource && this._artifactSource.name) {
      const refEntry = this._artifactSource.artifact.getPath(
        (this.constructor as typeof WBValue).withSuffix(
          this._artifactSource.name
        )
      );
      return String(refEntry.refUrl());
    }
    return null;
  }
}
