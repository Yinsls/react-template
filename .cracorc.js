const { whenProd, loaderByName } = require('@craco/craco');
const path = require('path');
const CracoLessPlugin = require('craco-less'); // 加载less
const sassResourcesLoader = require('craco-sass-resources-loader'); // 全局加载sass文件
const WebpackBar = require('webpackbar'); // 打包进度条
const TerserPlugin = require('terser-webpack-plugin'); // 代码压缩: 清除日志｜特定函数等

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@component': path.resolve(__dirname, 'src/components'),
    },
    plugins: [
      new WebpackBar(),
      ...whenProd(
        () => [
          new TerserPlugin({
            terserOptions: {
              sourceMap: true,
              compress: {
                drop_console: whenProd(() => true), // 生产环境中清除console.*这些函数的调用
                drop_debugger: whenProd(() => true), // 生产环境中清除debugger
                pure_funcs: ['console.log'], // 干掉特定的函数比如console.info，那用pure_funcs来处理
              },
              format: {
                comments: false, //删除注释
              },
            },
          }),
        ],
        []
      ),
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {}, // 定义变量
            javascriptEnabled: true,
          },
        },
        modifyLessModuleRule(lessModuleRule, context) {
          lessModuleRule.test = /\.module\.(less)$/;
          const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'));
          cssLoader.options.importLoaders = 4;
          cssLoader.options.modules = {
            localIdentName: '[local]_[hash:base64:5]',
          };
          return lessModuleRule;
        },
      },
    },
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          './src/common/scss/public.scss',
          './src/common/scss/variable.scss',
        ],
      },
    },
  ],
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      proxy: {
        '/api': {
          target: 'http://xxx.cn',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    };
  },
};
