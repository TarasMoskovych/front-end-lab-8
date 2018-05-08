import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import sortById from './features/data/Sorting';
import shifting from './features/data/Shifting';
import Loader from './features/loader/Loader';
import DisplayColors from './features/dispayColors/DisplayColors';
import SearchForm from './features/searchForm/SearchForm';
import NotFound from './features/searchForm/NotFound';
import SelectedColors from './features/selectedColors/SelectedColors';
import AvailableColors from './features/availableColors/AvailableColors';
import EmptyColors from './features/emptyColors/EmptyColors';
import ServerError from "./features/serverError/ServerError";
const url = 'https://epam-fe-homework-15.firebaseio.com/colors.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generalStorage: [],
            currentStorage: [],
            selectedStorage: [],
            displaySelectedStorage: [],
            currentItem: '',
            isEmpty: false,
            serverError: false
        };

        this.selectColor = this.selectColor.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    componentDidMount() {
        fetch(url)
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    throw new Error('Server error!');
                }
            })
            .then(data => this.setState({
                currentStorage: data,
                generalStorage: data,
                serverError: false
            }))
            .catch((error) => this.setState({
                serverError: true
            }));
    }

    applyFilter(item) {
        let filteredStorage = this.state.generalStorage.filter(color => new RegExp(item, 'i')
                                                       .exec(color.tags.toString()));
        let flag = filteredStorage.length === 0;

        this.setState({
            currentStorage: filteredStorage,
            currentItem: item,
            isEmpty: flag
        });
    }

    selectColor(item){
        let general = this.state.generalStorage;
        let selected = this.state.selectedStorage;

        if(selected.length < 10){
            let display;

            selected.push(item);
            display = selected;
            general.splice(this.state.generalStorage.indexOf(item), 1);

            this.applyFilter(this.state.currentItem);
            this.setState({
                generalStorage: general,
                selectedStorage: selected,
                displaySelectedStorage: shifting(display)
            });
        }
    }

    deleteColor(item){
        let general = this.state.generalStorage;
        let selected = this.state.selectedStorage;
        let display;

        selected.splice(selected.indexOf(item), 1);
        display = selected;
        general.push(item);
        sortById(general);

        this.applyFilter(this.state.currentItem);
        this.setState({
            generalStorage: general,
            selectedStorage: selected,
            displaySelectedStorage: shifting(display)
        });
    }

    render() {
        if(this.state.serverError){
            return <ServerError />
        } else {
            return (
                <div className="container">
                    <div className="header">
                        <SearchForm filter={this.applyFilter} />
                        <div>
                            {(() => {
                                if(this.state.displaySelectedStorage.length === 0){
                                    return <EmptyColors />
                                } else {
                                    return <SelectedColors output={this.state.displaySelectedStorage}
                                                           delete={this.deleteColor}/>
                                }
                            })()}
                            <AvailableColors colors={this.state.currentStorage.length} />
                        </div>
                    </div>
                    {(() => {
                        if(this.state.generalStorage.length === 0 && this.state.selectedStorage.length === 0){
                            return <Loader />
                        }
                        if(!this.state.isEmpty){
                            return (
                                <div className="colors-container">
                                    <DisplayColors list={this.state.currentStorage}
                                                   select={this.selectColor} />
                                </div>
                            )
                        } else {
                            return <NotFound />
                        }
                    })()}
                </div>
            )
        }
    }
}

export default hot(module)(App);