import React, { Component } from 'react';
import api from '../../api';
import Axios from 'axios';
import "../../index.scss";
import { Route, Link, Switch } from 'react-router-dom';
import Newsfeed from '../pages/Newsfeed';
import AlbumDetails from '../pages/AlbumDetails';
//import Picture from '../../../../server/models/'
// import { Cloudinary } from ''


class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      description: ''
    }
  }
  handleFileChange(e) {
    console.log("the file target ======= ", e.target)
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }
  handleChange(e) {
    console.log("the handle change ------- ", e.target)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    var data = {
      description: this.state.description
    }
    console.log("this is the data being passed -------- ", data);
    // Reuse of the method "addPicture" from the file '../api'
    api.addPicture(this.state.file, data).then(result=>{
      console.log("the fruits of our labor ---------- ", result)
    })
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
      <div className="ImageUpload">
        <h2>Add a photo</h2>
        
        
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="file" name="file" onChange={(e)=>this.handleFileChange(e)} /> <br/>
          <input type="text area" name="description" value={this.state.description} placeholder="description" onChange={(e)=>this.handleChange(e)} /> 
          <button type="submit">Upload</button>
        </form>
      <br></br>
        <br></br>
        <br></br>
       {/*} <Link to="/newsfeed">Added to Newsfeed!</Link> */}

        <Switch>
        <Route path="/albumDetails:id" component={AlbumDetails} /> 
        </Switch>
      </div>
    );
  }
}

export default ImageUpload;