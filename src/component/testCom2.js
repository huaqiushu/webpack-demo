/**
 * Created by Administrator on 2018/4/17/017.
 */
import React from 'react';
const EventstateUpdater = require('events');

class LongStringChunked2 extends React.Component {
    constructor() {
        super(...arguments);

        this.onInputChange = this.onInputChange.bind(this);
        this.state = {str: ''};
        this.stateUpdater = new EventstateUpdater();
    }

    onInputChange(e) {
        this.stateUpdater.emit('update', e.target.value);
    }

    render() {
        console.log('enter render');
        var chunk=<Chunk listen={this.stateUpdater} />;
        return <div>
            <input onChange={this.onInputChange} />
            <p>
               test@2
            </p>
        </div>;
    }
}

export class Chunk extends React.Component {
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

export default LongStringChunked2;