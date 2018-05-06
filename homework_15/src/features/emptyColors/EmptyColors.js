import React, {Component} from 'react';

class EmptyColors extends Component {
    render() {
        return (
            <div className="selected-colors-wrapper">
                <div className="selected-color-current first-empty"></div>
                <div className="selected-color-current second-empty"></div>
                <div className="selected-color-current third-empty"></div>
            </div>
        )
    }
}

export default EmptyColors;