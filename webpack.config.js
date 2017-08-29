var webpack = require('webpack');
var path = require('path');

// todo: move into ko-bindings

module.exports = {
    resolve: {
        root: [
            __dirname, path.join(__dirname, 'src/')
        ],
        alias: {
            "inputmask.dependencyLib": path.join(__dirname, "node_modules/jquery.inputmask/extra/dependencyLibs/inputmask.dependencyLib.jquery"),
            "inputmask": "jquery.inputmask"
        }
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
    }
}