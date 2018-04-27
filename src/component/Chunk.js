/**
 * Created by Administrator on 2018/4/26/026.
 */
import React from "react";
    
    
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

export default Chunk;

// module.exports=Chunk;