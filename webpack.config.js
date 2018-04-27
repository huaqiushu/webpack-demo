/**
 * Created by Administrator on 2018/4/17/017.
 */
var path=require("path");
var webpack=require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
// var publicPath = '/bundle/';
var publicPath = '/';


// __dirname + '/src'
// path.resolve(__dirname, 'src')
// path.resolve(__dirname, './src')
// path.join(__dirname, '/src')
// path.join(__dirname, './src')
// path.join(__dirname, 'src')
// console.log(__dirname + '/src');
console.log(path.resolve(__dirname, './src'));

module.exports={
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./bundle"),
        filename: "js/bundle.js"
        // publicPath: publicPath
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: "babel",query: {presets: ['react','es2015']}},
            {test: /\.jsx$/,loader: 'babel', query: {presets: ['react', 'es2015']}},
            {test: /\.css$/, loader: "style!css"},
            {test: /\.(jpg|png|otf)$/, loader: "url?limit=2000"},
            {test: /\.scss$/, loader: "style!css!sass"}
        ]
    },
    devServer: {
        // contentBase: path.join(__dirname, "bundle"),
        // publicPath:"/bundle/",
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // filename: 'index.html', //生成的html存放路径，相对于 path
            // template: './index.html', //html模板路径
            // inject:'body',
            title: '注册',
            template: 'index.html',//html模板路径 
            inject: 'body',
            filename: 'index.html',   //输出html文件的位置 相对于 path
            hash: true    //为静态资源生成hash值
        })
    ]
};