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
      description: [],
      album: String
    };
  }

  // userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },


  componentDidMount(){
    console.log(this)
    console.log(this.props.match.params.id)

    api.getMyAlbumDetails(this.props.match.params.id).then(albumDetails=>{
      console.log("show the details",albumDetails)

      this.setState({albumDetails: albumDetails.AlbumDetails})       
    })
  }
  showAlbumDetails = () => {
    return this.state.albumDetails.map((eachAlbumDetails,i)=>{
             return{eachAlbumDetails}
    })
  }
  handleFileChange(e) {
    //console.log("the file target ======= ", e.target)
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }
  handleChange(e) {
    //console.log("the handle change ------- ", e.target)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    var data = {
      description: this.state.description
    }
    //console.log("this is the data being passed -------- ", data);
    // Reuse of the method "addPicture" from the file '../api'
    api.addPicture(this.state.file, data).then(result=>{
      //console.log("the fruits of our labor ---------- ", result)
    })

    api.getPics().then(pictures=>{

      console.log(pictures[0].imageURL)
      console.log(pictures[0].description)

      // loop thru pictures array and take picture[i].imageURL and 
      // picture[i].description

    


    })

  }

  showPictures() {
    // console.log(this.state.pictures)
    if(this.state.pictures) {
      return this.state.pictures.map((picture, i) => {
        console.log("the picture info ------ ", picture.imageURL)
        if(picture.imageURL) {
          return (
            <div className="post">
              <img key={i} src={picture.imageURL} alt="your pic"/>
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
    // console.log("this is the state ------- ", this.state);
    
  }


  
  render(){
    console.log(this.state.pictures)
    console.log("Test")
    return(
      <div>
         <h4>{this.state.title}</h4> 

      {this.showAlbumDetails}
     
       
      
      <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="file" name="file" onChange={(e)=>this.handleFileChange(e)} /> <br/>
          <input type="text area" name="description" value={this.state.description} placeholder="description" onChange={(e)=>this.handleChange(e)} /> 
          <button type="submit">Upload</button>
        </form>
      {/* conditional with image Id}*/}
        {this.showPictures()}
        
      
      </div>
      
    )
  }
  
  
  
}

