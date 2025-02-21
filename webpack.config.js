import path from "path";
import { fileURLToPath } from "url";
import { VueLoaderPlugin } from "vue-loader";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: {
    content: "./src/content.ts",
    main: "./src/main.ts",
    "pitch-processor": "./src/pitch-processor.ts", // Compile pitch-processor.ts
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/background.js", to: "background.js", noErrorOnMissing: true },
        { from: "index.html", to: "index.html", noErrorOnMissing: true },
      ],
    }),
  ],
  mode: "production",
};
