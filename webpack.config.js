var path = require('path');
var process = require('process');

var config = {
    entry: {
        app: path.resolve(__dirname, 'src/app.js'),
    },
    resolve: {
        extensions: ['', '.coffee', '.js']
    },
    output: {
        path: path.resolve(__dirname, env('build', 'dist')),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel?presets=es2015'
        }]
    },
};

module.exports = config;

function env(outputDevStr, outputPubStr) {
    if (process.env.NODE_ENV === 'publish') {
        return outputPubStr;
    } else {
        return outputDevStr;
    }
}