import { fileURLToPath } from 'node:url'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import path, { dirname } from 'node:path'

export default {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  experiments: { outputModule: true },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })]
  },
  output: {
    filename: 'binaryTranscoder.mjs',
    library: { type: 'module' },
    path: path.resolve(dirname(fileURLToPath(import.meta.url)), 'dist')
  },
  plugins: [
    new NodePolyfillPlugin({ includeAliases: ['Buffer'] })
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
