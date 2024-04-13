/* eslint-env node */

import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: {
    main: path.join(__dirname, "/src/main.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [{ loader: "ts-loader" }],
      },
    ],
  },
};
