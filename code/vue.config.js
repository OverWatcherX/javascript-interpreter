// vue.config.js
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.jison$/,
          use: "jison-loader"
        }
      ]
    }
  }
};
