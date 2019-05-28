import React, { Component } from 'react';
import api from '../../api';
import '../../index.scss'


export default class Newsfeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsfeed: []
    }
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
            <div className="post">
              <img key={i} src={picture.imageURL} />
              <h4>{picture.description}</h4>
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
  render() {
    return (
      <div className="Newsfeed">
        <h2>Newsfeed</h2>

        <div className="uploaded-images">
        {this.showPictures()}
        </div>
        {/*this.state.picture.map(c => <li key={picture.imageUrl}>{picture.description}</li>)*/} 
      </div>
    );
  }
  /*componentDidMount() {
    api.getNewsfeed()
      .then(newsfeed => {
        console.log(newsfeed)
        this.setState({
          newsfeed: newsfeed
        })
      })
      .catch(err => console.log(err))
  } */
} 