import React, {Component} from 'react';

class SearchForm extends Component {
    render() {
        return (
            <input type="text" className="search-form" autoFocus placeholder="Color's name, tags"
                   onChange={(e) => this.props.filter(e.target.value)} />
        )
    }
}

export default SearchForm;