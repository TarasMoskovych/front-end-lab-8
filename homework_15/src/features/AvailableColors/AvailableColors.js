import React, {Component} from 'react';

class AvailableColors extends Component {
    render() {
        return (
            <div className="available-colors">Colors: {this.props.colors}</div>
        )
    }
}

export default AvailableColors;