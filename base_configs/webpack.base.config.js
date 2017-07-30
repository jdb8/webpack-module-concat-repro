'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve('./build/'),
        filename: 'js/output.js',
    },

    // Transpile our es6, but ensure modules are left untouched
    // in order for module concatenation to have a chance to work
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        [
                            'env',
                            {
                                'modules': false,
                            },
                        ],
                    ],
                },
            }
        ]
    },

    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
}
