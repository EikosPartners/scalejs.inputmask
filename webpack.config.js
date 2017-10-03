var webpack = require('webpack');
var path = require('path');

// todo: move into ko-bindings

module.exports = {
    resolve: {
        root: [
            __dirname, path.join(__dirname, 'src/')
        ]
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: [
                    path.join(__dirname, 'src/'),
                    path.join(__dirname, 'test/tests/')
                ],
                exclude: /\.html?$/,
                query: {
                    presets: 'es2015'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}