import pkg from './package.json';
import graphql from 'rollup-plugin-graphql';
import typescript from 'rollup-plugin-typescript2';
import { generateBaseConfig } from '../rollup.base.config';

const server = {
  input: 'src/index.server.ts',
  output: [
    {
      file: pkg.server,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      // eslint-disable-next-line global-require
      typescript: require('typescript'),
    }),
    graphql(),
  ],
};

export default [generateBaseConfig(pkg), server];
