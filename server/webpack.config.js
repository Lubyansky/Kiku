'use strict';

module.exports = {
    context: __dirname + '/static',
    entry: __dirname + '/static/src',
    output: {
        filename: "/static/build.js"
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    }
}; 