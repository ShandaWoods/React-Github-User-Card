import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserCardStyle from './Components/UserCardStyle';
import './index.css';

class App extends React.Component {
    state = {
        users: {}, 
        followers: []
    
    };
    componentDidMount() {
        axios.get('https://api.github.com/users/ShandaWoods').then(response => {
            console.log('Look at the response', response);
            this.setState({ users: response.data});
            return this.fetchFollowers()
        });
    //     axios 
    //     .get(`https://api.github.com/users/${this.state.users.login}/followers`)
    //     .then(response => {
    //  console.log('follower response biz', response);
    //         this.setState({ users: response.data.message });
    //     });
        // window.addEventListener('resize', this.handleResize);
    } 

    componentWillUnmount() {
    // window.removeEventListener('resize', this.handleResize);
}
    // componentDidUpdate(prevProps, prevState) {
    // if (prevState.users !== this.state.users) {
    //     console.log('new users state');
    //     axios.get('https://api.github.com/users/ShandaWoods').then(response => {
    //         console.log('Look at the response', response);
    //         this.setState({ users: response.data.avatar_url});
    //     });
    // }
    // }
    fetchFollowers =  ()=> {
        axios 
        .get(`https://api.github.com/users/${this.state.users.login}/followers`)
        .then(response => {
            console.log('followers response: ', response);

            this.setState({ followers: response.data });
        });
    };

    render() {
        console.log("user data: ", this.state.users);
        console.log("follower data: ", this.state.followers);
        return (
        <div className='App'>
            <h1> Git Hub User Card</h1>
            <div className='users'>
             <UserCardStyle
              image={this.state.users.avatar_url}
              name={this.state.users.name}
             />
            </div>
        </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
