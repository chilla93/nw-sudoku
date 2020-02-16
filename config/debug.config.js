const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const debug_folder = '../build_debug/';
const port = 3000;
const webpack_config = require("../webpack.debug.config");
const { exec } = require('child_process');

const webpack_dev_server_config = webpack_config.devServer || {};
console.log('Starting...')

var startWebpack = function () {
    return new Promise((resolve, reject) => {

        const compiler = webpack(webpack_config);
        webpack_dev_server = new WebpackDevServer(compiler, webpack_dev_server_config);

        compiler.hooks.done.tap('Done', (context, entry) => {
            resolve()
        });

        webpack_dev_server.listen(port, 'localhost', function (err) {
            if (err) {
                reject(err)
            }
        })
    });
}

const startNW = function () {
  return new Promise((resolve, reject) => {
    try {
      
        child = exec("nw public/")

        child.on('close', (exit_code) => {
            if (typeof webpack_dev_server !== 'undefined' && webpack_dev_server !== null) {
                webpack_dev_server.close()
            }
        });

        resolve()
    } catch (err) {
        reject(err)
    }
});
}

startWebpack().then(startNW).then(() => console.log("DONE DONE"));