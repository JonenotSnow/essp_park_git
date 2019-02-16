const config = {
  entry: { main: "./ueditor.all.js" },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}

module.exports = config;
