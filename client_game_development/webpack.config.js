const path = require('path');

module.exports = {
  //mode: 'production',
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, '../public/gameplay_assets/scripts/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
