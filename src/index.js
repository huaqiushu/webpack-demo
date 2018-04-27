/**
 * Created by Administrator on 2018/4/17/017.
 */

import React from "react";
import ReactDOM from "react-dom";
import App from './container/app';
import './css/style.css';
// import './css/index.scss';

// store.dispatch(addNote('Learn about actions'));
//监听state的每一次变化，若调用所返回函数unsubscribe( )，则监听取消
// var unsubscribe = store.subscribe( () => console.log(store.getState()) );

ReactDOM.render(<App/>, document.getElementById("root"));

// console.log("aaa");

if (!PRODUCTION) {
    console.log('Debug info')
}
if (PRODUCTION) {
    console.log('Production log')
}

//热更新，不会刷新页面那种，直接更新局部内容，不添加这个会自动更新但是会刷新页面
if (module.hot) {
    module.hot.accept()
}