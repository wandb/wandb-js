/* eslint-disable import/no-extraneous-dependencies */
import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.wandb.ai/graphql',
  documents: ['src/**/*.ts'],
  emitLegacyCommonJSImports: false,
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
  },
  hooks: {afterAllFileWrite: ['prettier --write']},
};

export default config;
