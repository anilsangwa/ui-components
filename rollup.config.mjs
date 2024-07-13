// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js", // Entry point of your application
  output: {
    dir: "dist", // Output directory for bundled files
    format: "es", // Output format (ES module)
    entryFileNames: "[name].js", // Naming pattern for entry files
    chunkFileNames: "[name]-[hash].js", // Naming pattern for chunk files
  },
  plugins: [
    resolve({
      extensions: [".js", ".jsx", ".json", ".scss"], // Resolves these file extensions
    }),
    commonjs(), // Convert CommonJS modules to ES modules
    postcss({
      modules: {
        generateScopedName: "[name]__[local]___[hash:base64:5]", // CSS modules naming pattern
      },
      inject: true, // Inject CSS into the bundle
      minimize: true, // Minify CSS
      sourceMap: true, // Generate source maps for CSS
    }),
    terser(), // Minify the JavaScript output
    babel({
      exclude: "node_modules/**", // Exclude node_modules from Babel processing
      babelHelpers: "bundled", // Bundle Babel helpers with each module
      presets: ["@babel/preset-env", "@babel/preset-react"], // Babel presets for environment and React
    }),
  ],
  external: ["react", "react-dom"], // Treat React and ReactDOM as external dependencies
};
