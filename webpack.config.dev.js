/**
 * Created by Administrator on 2018/4/17/017.
 */
var path=require("path");
var webpack=require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

let cssExtract=new ExtractTextPlugin("style.css");
let sassExtract=new ExtractTextPlugin("index.css");

// var publicPath="http://localhost:3001/";

module.exports={
    devtool:'inline-source-map',
    entry: {
        app:"./src/index.js",
        a:"./src/a.js",
        // react:"react",
        // jquery:"jquery"
        vendor: ["react","jquery"]
    },
    output: {
        path: path.resolve(__dirname, "./bundle"),
        filename: "js/[name].[hash:8].js",
        // publicPath: publicPath
        chunkFilename:'js/[name].[hash:8].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: "babel",
                query: {
                    presets: ['react', 'es2015', "stage-0"]
                }
            },
            {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', "stage-0"]
                }
            },
            // {test: /\.css$/, loader: ExtractTextPlugin.extract('style','css')},
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: cssExtract.extract('style', 'css?importLoaders=2!postcss!sass')
                //importLoaders=1 表示css文件里面通过@import方式引入的文件，会通过css-loader 前面的一个loader执行，即postcss，如果=2，则先经过前面的两个loader执行，即!postcss!sass
            },
            {
                test: /\.scss$/,
                exclude: /^node_modules$/,
                loader: sassExtract.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url",
                query: {
                    limit: 10000
                }
            }
            // {
            //     test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            //     exclude: /^node_modules$/,
            //     loader: 'file?name=[name].[ext]'
            // },
            // {
            //     test: /\.(png|jpg)$/,
            //     exclude: /^node_modules$/,
            //     loader: 'url-loader?limit=20000&name=[name]'  //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            // },
            // {
            //     test: /\/favicon.ico$/,
            //     include: "",
            //     loader: 'file',
            //     query: {
            //         name: 'favicon.ico?[hash:8]'
            //     }
            // },
            // {
            //     test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
            //     loader: 'url',
            //     query: {
            //         limit: 10000,
            //         name: 'static/media/[name].[hash:8].[ext]'
            //     }
            // }
            
        ]
    },
    postcss: function () {
        return [autoprefixer({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
            ]
        })];
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            // name: ["react","jquery"],
            name: ["vendor","manifest"]
            // chunks: ['react', 'jquery',"manifest"]
            // filename: 'common.bundle.js',
            // minChunks: 2,
            // name:["vendors"]
        }),
        new webpack.ProvidePlugin({ $: "jquery",  jQuery: "jquery",  "window.jQuery": "jquery"  }),
        cssExtract,
        sassExtract,
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            title: '注册1',
            template: 'index.html',//html模板路径 
            inject: 'body',
            filename: 'index.html',   //输出html文件的位置 相对于 path
            hash: false,    //为静态资源生成hash值　如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用。
            // chunks:["react","jquery","app"],
            chunks:["vendor","manifest","app"]
        }),
        // new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        //     title: '注册2',
        //     template: 'a.html',//html模板路径
        //     inject: 'body',
        //     filename: './aHtml/a.html',   //输出html文件的位置 相对于 path
        //     hash: true,    //为静态资源生成hash值
        //     chunks:["a"]
        // }),
        new webpack.DefinePlugin({ //将环境切换到生产环境，将React切换到产品环境 (同时要设置)
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
            PRODUCTION: JSON.stringify(false)
        })

    ],
    devServer: {
        hot: true,
        port: 3001,
        inline: true
    }
};