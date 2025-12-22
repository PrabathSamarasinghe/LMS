const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require("webpack");
require("dotenv").config();

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "gtn",
    projectName: "login-mfe",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new webpack.DefinePlugin({
        "process.env.REACT_APP_COGNITO_USER_POOL_ID": JSON.stringify(
          process.env.REACT_APP_COGNITO_USER_POOL_ID
        ),
        "process.env.REACT_APP_COGNITO_CLIENT_ID": JSON.stringify(
          process.env.REACT_APP_COGNITO_CLIENT_ID
        ),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["postcss-loader"],
        },
      ],
    },
  });
};
