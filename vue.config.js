//按需加载antd-vue 需要安装 babel-plugin-import --save-dev
const path = require("path");
const apiMocker = require("mocker-api");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启压缩
const { resolve } = path;
const isProduction = process.env.NODE_ENV === "production"; // 开发环境中为true，否则为false
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  assetsDir: "static", //静态资源文件
  productionSourceMap: false, //生成环境去掉map
  // css: {
  //   extract: debug, // 是否使用css分离插件 ExtractTextPlugin
  //   sourceMap: false, // 开启 CSS source maps?
  //   modules: false, // 启用 CSS modules for all css / pre-processor files.
  //   loaderOptions: {
  //     sass: {
  //       // @/ 是 src/ 的别名
  //       // 所以这里假设你有 `src/variables.sass` 这个文件
  //       // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
  //       additionalData: `@import "~@/variables.sass"`
  //     },
  //     // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
  //     // 因为 `scss` 语法在内部也是由 sass-loader 处理的
  //     // 但是在配置 `prependData` 选项的时候
  //     // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
  //     // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
  //     scss: {
  //       additionalData: `@import "~@/variables.scss";`
  //     },
  //     less: {
  //       // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
  //       // `primary` is global variables fields name
  //       globalVars: {
  //         primary: "#fff"
  //       }
  //     }
  //   }
  // },
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复热更新失败
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@images", resolve("src/assets/images"))
      .set("@components", resolve("src/components"))
      .set("@layout", resolve("src/layout"))
      .set("@utils", resolve("src/utils"))
      .set("@libs", resolve("src/libs"))
      .set("@apis", resolve("src/apis"));
    // config.module
    //   .rule("images")
    //   .use("image-webpack-loader")
    //   .loader("image-webpack-loader")
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end();
    if (process.env.NODE_ENV === "production") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .end();
      config.plugins.delete("prefetch");
    }
    // svg 图标注册
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader");
  },
  configureWebpack: config => {
    const plugins = [];
    // 服务器也要相应开启gzip
    if (isProduction) {
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      );
    }
    config.optimization = {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 1000 * 60,
        cacheGroups: {
          // vendor: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name(module) {
          //     // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
          //     const packageName = module.context.match(
          //       /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          //     )[1];
          //     return `npm.${packageName.replace("@", "")}`;
          //   }
          // }
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    };
    // 取消webpack警告的性能提示
    // config.performance = {
    //   hints: "warning",
    //   //入口起点的最大体积
    //   maxEntrypointSize: 1000 * 500,
    //   //生成文件的最大体积
    //   maxAssetSize: 1000 * 1000,
    //   //只给出 js 文件的性能提示
    //   assetFilter: function(assetFilename) {
    //     return assetFilename.endsWith(".js");
    //   }
    // };
  },
  devServer: {
    before(app) {
      apiMocker(app, path.resolve(__dirname, "./mock/index.js"), {}); //mock
    },
    proxy: {
      // "/electric": {
      //   target: "",
      //   ws: true,
      //   changeOrigin: true,
      //   onProxyReq(proxyReq, req) {
      //     const cookie = req.headers["cookie"];
      //     if (cookie) {
      //       proxyReq.setHeader("cookie", cookie);
      //     }
      //   }
      // },
      "/foo": {
        target: "<other_url>"
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: []
    }
  }
};
