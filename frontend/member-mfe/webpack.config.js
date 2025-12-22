const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "gtn",
    projectName: "member-mfe",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["postcss-loader"],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        cacheGroups: {
          // Separate recharts into its own chunk
          recharts: {
            test: /[\\/]node_modules[\\/]recharts[\\/]/,
            name: 'recharts-vendors',
            priority: 10,
            enforce: true,
            chunks: 'async',
          },
          // Separate emotion into its own chunk
          emotion: {
            test: /[\\/]node_modules[\\/]@emotion[\\/]/,
            name: 'emotion-vendors',
            priority: 9,
            enforce: true,
            chunks: 'async',
          },
          // Separate MUI into its own chunk
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui-vendors',
            priority: 8,
            enforce: true,
            chunks: 'async',
          },
          // Common vendor chunk for other node_modules
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 7,
            enforce: true,
            chunks: 'async',
          },
          // Common code used across chunks
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            chunks: 'async',
          },
        },
      },
    },
  });
};



