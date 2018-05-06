import React, {Component} from 'react';

class DisplayColors extends Component {
    render() {
        return (
            <div className="colors-wrapper">
                {this.props.list.map((color) => {
                    return (
                        <div key={color.id} className="color-block" style={{'backgroundColor': color.color}}>
                            <div className="add-icon" onClick={() => this.props.select(color)}>
                                <i className="material-icons">add</i>Add
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default DisplayColors;