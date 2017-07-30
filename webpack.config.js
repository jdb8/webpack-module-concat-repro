'use strict';

const baseConfig = require('base_configs');
const merge = require('webpack-merge');
const webpack = require('webpack');

console.log(require.resolve('webpack'));

module.exports = merge(baseConfig, {
    // Uncommenting this line fixes the issue
    // plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
});
