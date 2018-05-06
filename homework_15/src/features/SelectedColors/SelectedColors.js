import React, {Component} from 'react';

class SelectedColors extends Component {
    render() {
        return (
            <div className="selected-colors-wrapper">
                {this.props.output.map((color) => {
                    return (
                        <div key={color.id}
                             className={'selected-color-current'}
                             style={{'backgroundColor': color.color}}><i
                             onClick={() => this.props.delete(color)}
                             className="material-icons">clear</i></div>
                    )
                })}
            </div>
        )
    }
}

export default SelectedColors;