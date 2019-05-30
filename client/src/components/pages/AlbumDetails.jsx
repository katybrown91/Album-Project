import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Albums from "./Albums";
import api from '../../api';
import ImageUpload from './ImageUpload';


export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: String,
      imageURL: [],
      description: '',
      album: null, 
      pictures: [],
      // picture: null //test
      file: '',
    };
  }

  // userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },


  componentDidMount(){


    api.getMyAlbumDetails(this.props.match.params.id).then(albumDetails=>{

      this.setState({
        album: albumDetails.AlbumDetails,
        // picture: albumDetails.albumDetails.pictures
      }) 
           
    })
  }


  showAlbumDetails = () => {
    return this.state.albumDetails.map((eachAlbumDetails,i)=>{
             return{eachAlbumDetails}
    })
  }


  handleFileChange(e) {
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit(e) {
    e.preventDefault()
    var data = {
      description: this.state.description,
      albumId: this.state.album._id
    }
    // Reuse of the method "addPicture" from the file '../api'
    api.addPicture(this.state.file, data).then(result=>{
      this.setState({
        album: result,
        file: '',
        description: ''
      })
    })
    // if(this.state.album) {
    //   api.getPics(this.state.album._id).then(pictures=>{
  
   

  }

  showPictures() {
    console.log("................", this.state)
    if(this.state.album) {
      if(this.state.album.pictures.length > 0) {
        return this.state.album.pictures.map((picture, i) => {
          console.log("the picture info ------ ", picture)
          if(picture !== null) {
            return (
              <div className="post">
                <img key={i} src={picture.imageURL} alt="your pic" width="100%"/>
                <h4>{picture.description}</h4>
                <button type="button"
        onClick={() =>
        this.removePicture(picture, i)}>Delete</button>
              </div>
            )
          }
        })
      } else {
        
        return (
          <h3>Nothing to show</h3>
        )
      }
    }
  }

  removePicture(picture, index) {

    console.log(picture, 9999 )
    api.deletePicture(picture._id).then(res=>{
      const album = {...this.state.album};
      
      album.pictures.splice(index, 1); //pull out specific index
      this.setState({
        album
      })
    })
   
  }

  
  
  render(){
    return(
      <div>
         <h4>{this.state.title}</h4> 

      
      
      <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="file" name="file" onChange={(e)=>this.handleFileChange(e)} /> <br/>
          <input type="text area" name="description" value={this.state.description} placeholder="description" onChange={(e)=>this.handleChange(e)} /> 
          <button type="submit">Upload</button>
        </form>
        <br></br>
        <br></br>

      <div className= "album-pics">
      {this.showAlbumDetails}
        {this.showPictures()}

        </div> 
      
      </div>
      
    )
  }
  
  
  
}

