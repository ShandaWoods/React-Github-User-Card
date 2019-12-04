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
            {
                //this UserCardStyle represents your card
                //below it, we will reuse the same component but pass it different data
                //we will take the array of follower objects [{...}, {...}, etc]
                //map over it, and in the map callback function we will pass the same props (image and name) to a UserCardStyle component
            }
             <UserCardStyle
              image={this.state.users.avatar_url}
              name={this.state.users.name}
              bio={this.state.users.bio}
             />
            </div>
            {
                this.state.followers.map(follower => {
                    return (
                        <UserCardStyle 
                        image={follower.avatar_url}
                        name={follower.name}
                        bio={follower.bio}
                        />
                    )
                })
            }
        </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
