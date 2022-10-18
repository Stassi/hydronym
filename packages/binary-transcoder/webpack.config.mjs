import { fileURLToPath } from 'node:url'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import path, { dirname } from 'node:path'

const PACKAGE_NAME = 'binaryTranscoder'

export default {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.([cm]?ts|tsx)$/,
        use: [
          {
            // TODO: https://babeljs.io/docs/en/babel-preset-typescript
            // TODO: https://www.npmjs.com/package/babel-loader
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                '@babel/preset-typescript'
              ]
            }
          },
          'ts-loader'
        ]
      }
    ]
  },
  output: {
    filename: `${PACKAGE_NAME}.js`,
    path: path.resolve(dirname(fileURLToPath(import.meta.url)), 'dist')
  },
  plugins: [
    new NodePolyfillPlugin({
      includeAliases: ['Buffer']
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts']
    }
  }
}
