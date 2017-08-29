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
            "inputmask": "jquery.inputmask",
            "inputmask/dist/inputmask/inputmask.date.extensions": path.join(__dirname, "node_modules/jquery.inputmask/dist/inputmask/inputmask.date.extensions"),
            "inputmask/dist/inputmask/inputmask.extensions": path.join(__dirname, "node_modules/jquery.inputmask/dist/inputmask/inputmask.extensions"),
            "inputmask/dist/inputmask/inputmask.numeric.extensions": path.join(__dirname, "node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions"),
            "inputmask/dist/inputmask/inputmask.phone.extensions": path.join(__dirname, "node_modules/jquery.inputmask/dist/inputmask/inputmask.phone.extensions"),
            "inputmask/dist/inputmask/inputmask.regex.extensions": path.join(__dirname, "node_modules/jquery.inputmask/dist/inputmask/inputmask.regex.extensions")
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