import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import "../index.scss";
import Home from './pages/Home';
import Newsfeed from './pages/Newsfeed';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import ImageUpload from './pages/ImageUpload';
import Albums from './pages/Albums';
import AlbumDetails from './pages/AlbumDetails';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums:[],
      pictures: []
    }
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello!</h1>
          <NavLink to="/" exact>Login</NavLink>
          {api.isLoggedIn() &&<NavLink to="/newsfeed">My Albums</NavLink>}
          {/*{api.isLoggedIn() &&<NavLink to="/imageUpload">Upload Photo</NavLink>} */}
          {api.isLoggedIn() &&<NavLink to="/albums">Create an Album</NavLink>}
          {/*{api.isLoggedIn() &&<NavLink to="/albumDetails">View Albums</NavLink>} */}
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          {/*{api.isLoggedIn() &&<NavLink to="/profile">Profile</NavLink>} */}
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/newsfeed" component={Newsfeed} /> 
          <Route path="/ImageUpload" component={ImageUpload}/>
          <Route path="/albums" component={Albums} />
          <Route path="/albumDetails/:id" component={AlbumDetails} /> 
 
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}