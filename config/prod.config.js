const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const debug_folder = '../build_debug/';
const port = 3000;
const webpack_config = require("../webpack.prod.config");
const { exec } = require('child_process');
const nwBuilder = require('nw-builder');

// const webpack_dev_server_config = webpack_config.devServer || {};
console.log('Starting...')

var startWebpack = function () {
    return new Promise((resolve, reject) => {

        const compiler = webpack(webpack_config);
        // webpack_dev_server = new WebpackDevServer(compiler, webpack_dev_server_config);
        compiler.run((err, stats) => {
            if(err){
                //reject(err);
                console.log(err);
            }
        })

        compiler.hooks.done.tap('Done', (context, entry) => {
            resolve()
        });

    });
}

const buildNodeWebkitApplicaton = function (){
    
    var nw = new nwBuilder({
        files: "./lib/**/*", // use the glob format
        platforms: ['osx64'],
        version: '0.43.4'
    });
    
    // Log stuff you want
    nw.on('log',  console.log);
    
    nw.build().then(function () {
        console.log('all done!');
    }).catch(function (error) {
        console.log("error building");
        console.error(error);
    });
}

startWebpack().then(buildNodeWebkitApplicaton).then(() => console.log("DONE DONE"));