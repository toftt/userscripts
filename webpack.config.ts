import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  entry: {
    bunpro: "./src/bunpro.ts",
    jisho: "./src/jisho.ts",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
};

export default config;
