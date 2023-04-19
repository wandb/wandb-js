/* 
Look Away :( Gnarley patching of langchain to pass _self to the start of all callbacks. 
Hopefully this can go away soon...
*/
/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-explicit-any, no-param-reassign, func-names */
import {BaseChain} from 'langchain/chains';
import {Tool} from 'langchain/tools';
import {BaseLanguageModel} from 'langchain/base_language';

const origFuncs = ["BaseChain", "Tool", "BaseLanguageModel"];
let patched = false;

// TODO: I can not for the life of me fiture out how to patch these classes :/
export const ensurePatched = (scope) => {
  if (patched) {
    return;
  }
  patched = true;

  return [patchCallbacks(BaseChain), patchCallbacks(Tool), patchCallbacks(BaseLanguageModel)];
}

export function clearPatches() {
  if (!patched) {
    return;
  }
  const global = new Function("return this;")();
  origFuncs.forEach((key) => {
    global[key] = global[key+"Orig"];
  });

  patched = false;
}

const proxy = {
  get(obj, prop) {
    console.log('Proxy getter', prop);
    if (prop === 'wandbProxied') {
      return true;
    }
    if (
      ['handleLLMStart', 'handleToolStart', 'handleChainStart'].includes(prop)
    ) {
      return function (...args) {
        if (obj._boundModel != null) {
          args[0]._self = obj._boundModel;
        }
        return obj[prop].apply(obj, args);
      };
    }
    return obj[prop];
  },
};

export function patchCallbacks(orig) {
  const ref = orig;
  const origName = orig.name+"Orig";
  const global = new Function("return this;")()
  global[origName] = orig;
  class Patched extends orig {
    constructor(...args) {
      console.log('Patched constructor: ', args);
      super(...args);
      const cb = this.callbackManager;
      if (cb && !cb.wandbProxied) {
        this.callbackManager = new Proxy(cb, proxy);
        cb._boundModel = this;
      }
    }
  }
  global[orig.name] = Patched;
  return Patched;
}
