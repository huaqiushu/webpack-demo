/**
 * Created by Administrator on 2018/4/17/017.
 */
import React from 'react';
import PropTypes from 'prop-types';  // 从 React v15.5 开始 ，React.PropTypes 助手函数已被弃用，我们建议使用 prop-types 库 来定义contextTypes。
const EventstateUpdater = require('events');


require.ensure([],function(require){
    var Chunks=require('./Chunk');
    console.log(Chunks.default);
},'Chunk');

class LongStringChunked extends React.Component {
    static propTypes={name:PropTypes.string};
    static defaultProps={name:"name"};
    
    constructor() {
        super(...arguments);

        this.onInputChange = this.onInputChange.bind(this);
        this.state = {str: ''};
        this.stateUpdater = new EventstateUpdater();
    }
    conponentDidMount(){
       
    }

    onInputChange(e) {
        this.stateUpdater.emit('update', e.target.value);
        // console.log($("#test_com"));
    }
    handleClick(e){
        console.log($(e.target));
    }

    render() {
        console.log('enter render');
        var chunk=<Chunk listen={this.stateUpdater} />;
        return <div id="test_com" className="test-com">
            <input placeholder="hsihysiehiheni" onChange={this.onInputChange} />
            <p id="scroll_text">洗涤剂是让我们假装这是一段超长的字符串，包含 {chunk}  这样的子串，而且包含多个{chunk}cxzz.点点滴滴</p>
            <div className="src" onClick={(e)=>this.handleClick(e)}></div>
            <p>所得随口时{this.props.name}</p>
            <a href="./aHtml/a.html">跳转到a.html</a>
        </div>;
        
    }
}

class Chunk extends React.Component {
    constructor(props) {
        super(...arguments);

        this.state = {str: ''};
    }

    componentDidMount() {
        this.props.listen.on(
            'update',
            str  => {
                this.setState({str: str})
            }
        );
    }

    render() {
        console.log('enter chunk render');
        return this.state.str;
    }
}

export default LongStringChunked;