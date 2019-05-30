import React, { Component } from 'react';
import api from '../../api';
import '../../index.scss'

 class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
      message: null
    }
  }
 
  render() {
    return (
      <div className="Profile">
        <h2>My Profile</h2>
       <div className="profile-images">
        {this.showPictures()}
        </div>
        <div className="result">
          {this.state.profile}
        </div>
        {this.state.message && <div className="info info-danger">
          {this.state.message}

        </div>}
      </div>
    );
  }
  componentDidMount() {


    api.getPics().then(pictures=>{
      console.log(pictures)
      
      //add it to state && then loop throug it below.  map to show stuff 
      this.setState({
        pictures: pictures
      })
    })

  }

  showPictures() {
    if(this.state.pictures) {
      return this.state.pictures.map((picture, i) => {
        console.log("the picture info ------ ", picture.imageURL)
        if(picture.imageURL) {
          return (
            <div>
              <img key={i} src={picture.imageURL} />
              <div className="profile-description">
              <h4>{picture.description}</h4>
              </div>
            </div>
          )
        }
      })
    } else {
      return (
        <h3>Nothing to show</h3>
      )
    }
    console.log("this is the state ------- ", this.state);
    
  }


   }

export default Profile


/*
  componentDidMount() {
    api.getSecret()
      .then(data => this.setState({ profile: data.profile }))
      .catch(err => this.setState({ message: err.toString() }))
  }
  */


