'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                // target: 'http://128.64.216.95:8088/',
                // target: 'http://128.64.200.202:8088/',
                // target: 'http://128.196.235.131:8088/',
                // target: 'http://128.64.203.43:8088/',
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,
                // target: 'http://128.64.216.95:8088/',
                // target: 'http://128.64.200.74:8088/',
                // target: 'http://128.64.219.134:8088/',//景龙
                // target: 'https://want.ccb.com',
                // target: 'http://128.196.221.144:8082',

                // target: 'http://128.196.235.129:1345', //测试
                target: 'http://128.196.235.132:1345', //测试

                pathRewrite: {
                    '^/api': '/'
                    // 与后端进行数据交互的格式：/api/ + 接口路径
                    // 如新增用户接口：http://{ip}:{port}/user/save
                    // 前台 url 属性：url: '/api/user/save'
                }
            }
        },
        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
