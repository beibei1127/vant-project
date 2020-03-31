const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');


module.exports = {
    lintOnSave: false, //  lint 错误是否编译警告
    parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
    devServer: {
        proxy: {
            //一般接口
            "/data/my": {
                target: "http://admin.dev.yidoka.cn/data/my",
                changeOrigin: true,
                pathRewrite: {
                    "^/data/my": "/"
                }
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({
                        browsers: ['Android >= 4.0', 'iOS >= 7']
                    }),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                    })
                ]
            }
        }
    }
}
