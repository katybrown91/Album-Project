import React, { Component } from 'react';
import api from '../../api';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/newsfeed") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
        <h2>Backup your photos and create personilized albums</h2>
        <h2>Login</h2>
        <form>
          Username: <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} /> <br />
          Password: <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Login</button>
        </form>
        <div className="home-pics">
          <div className="image-one">
        <img src={"./images/camera.jpg"} alt="camera" width="100vw" height="100vh"/> <br></br><br></br><br></br>
        </div>
        <img src={"./images/book.png"} alt="book" width="100vh" height="100vh" /> <br></br><br></br><br></br>
        <img src={"./images/screens.png"} alt="screens" width="100vh" height="100vh" />
        </div>
       
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}
