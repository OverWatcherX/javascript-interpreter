const path = require('path')

const {
  override,
  addWebpackModuleRule,
} = require("customize-cra");

// 添加 jison-loader
// module.exports =
const overrides = override(
    addWebpackModuleRule({
      test: /\.jison$/,
      use: "jison-loader"
    }),
    addWebpackModuleRule({
      test: /\.raw\.jison$/,
      use: "raw-loader"
    })
  );

module.exports = function (config, env) {
  const rule = config.module.rules[2].oneOf[1]
  const {loader, options} = rule
  delete rule.loader
  delete rule.options
  rule.use = [
    { loader, options },
    {
      loader: path.resolve(__dirname, "src/framework/components/markdown/jsx-markdown-loader.js")
    }
  ];

  return overrides(config, env);
}