import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    process.env.SYLIUS_API_ENDPOINT ||
    'https://vsf2-demo-sylius.bitbag.io/api/v2/graphql',
  documents: ['src/**/*.ts'],
  generates: {
    './__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
