import React, { Component } from 'react'
import CardList from '../components/CardList';
import ErrorBoundry from '../components/ErrorBoundry';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'


class App extends Component {

    constructor(){
        super();
        this.state = {
            'robots': [],
            'searchfield': ""
        }

    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => (
                this.setState({robots : users})
        ));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield : event.target.value })
    }

    render(){
    const filteredRobots = this.state.robots.filter(
        robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        }
    )

    return !filteredRobots.length ?
    (
        <div>
            <h1 className="tc">Loading !!!</h1>
        </div>
    ):
    (
        <div>
            <h1 className="tc f1">RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    );
    }
}

export default App;
