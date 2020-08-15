const path = require('path');
// import modifyVarsTheme from "./src/style/less/variable.less";
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, "src/style/less/variable.less")] // 引入全局样式变量
        }
    },
    css: {
        // vue.config.js for less-loader@6.0.0 
        loaderOptions: {
            less: {
                lessOptions: {
                    // antd 基本样式修改
                    modifyVars: {
                        // 'primary-color': '#1DA57A',
                        // 'link-color': '#1DA57A',
                        'border-radius-base': '0',
                        'input-height-base': '40px',
                        'btn-height-base': '40px',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
}
