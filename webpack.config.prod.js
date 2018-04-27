/**
 * Created by Administrator on 2018/4/17/017.
 */
var path=require("path");
var webpack=require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

let cssExtract=new ExtractTextPlugin("style.[contenthash:8].css");
let sassExtract=new ExtractTextPlugin("index.[contenthash:8].css");

module.exports={
    entry: {
        app:"./src/index.js",
        a:"./src/a.js",
        vendor: ["jquery","react"]
    },
    output: {
        path: path.resolve(__dirname, "./bundle"),
        filename: "js/[name].[chunkHash].js",
        chunkFilename:'js/[name].[chunkHash:8].chunk.js'
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
        new webpack.ProvidePlugin({ $: "jquery",  jQuery: "jquery",  "window.jQuery": "jquery"  }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor","manifest"]
        }),
        cssExtract,
        sassExtract,
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            title: '注册1',
            template: 'index.html',//html模板路径 
            inject: 'body',
            filename: 'index.html',   //输出html文件的位置 相对于 path
            hash: true,    //为静态资源生成hash值
            chunks:["vendor","manifest","app"],
            // favicon:"./src/fav.ico",
            minify: { //压缩HTML文件
                removeAttributeQuotes: true, // 移除属性的引号
                caseSensitive: false, //是否大小写敏感
                removeComments:true, // 去除注释
                removeEmptyAttributes:true, // 去除空属性
                collapseWhitespace: true //是否去除空格
            }
        }),
        // new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        //     title: '注册2',
        //     template: 'a.html',//html模板路径
        //     inject: 'body',
        //     filename: './aHtml/a.html',   //输出html文件的位置 相对于 path
        //     hash: true,    //为静态资源生成hash值
        //     chunks:["a"],
        //     minify: { //压缩HTML文件
        //         removeAttributeQuotes: true, // 移除属性的引号
        //         caseSensitive: false, //是否大小写敏感
        //         removeComments:true, // 去除注释
        //         removeEmptyAttributes:true, // 去除空属性
        //         collapseWhitespace: true //是否去除空格
        //     }
        // }),
        // new webpack.DefinePlugin({
        //     PRODUCTION: JSON.stringify(true),
        //     VERSION: JSON.stringify("5fa3b9"),
        //     BROWSER_SUPPORTS_HTML5: true,
        //     TWO: "1+1",
        //     "typeof window": JSON.stringify("object")
        // }),
        new webpack.DefinePlugin({
            //将环境切换到生产环境，将React切换到产品环境
            // 并且同时要设置："build": "set NODE_ENV=production && webpack --progress --config ./webpack.config.prod.js", （windows系统用set）
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
            PRODUCTION: JSON.stringify(true)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {  //压缩
                screw_ie8: true, // React doesn't support IE8
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        })

    ]
};