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
    // console.log("thi sis the this in album details", this)
    // console.log("the is the id of the album for the details ---------- ", this.props.match.params.id)

    api.getMyAlbumDetails(this.props.match.params.id).then(albumDetails=>{
      // console.log("Get from backend")
      // console.log("show the details",albumDetails)

      this.setState({
        album: albumDetails.AlbumDetails,
        // picture: albumDetails.albumDetails.pictures
      }) 
      // console.log("the album details %%%%%%%%%%%%%%%%%%%%%%%%%%% ", albumDetails)      
    })

    // api.getPics().then(pictures=>{

    //   console.log(pictures[0].imageURL)
    //   console.log(pictures[0].description)

    //   // loop thru pictures array and take picture[i].imageURL and 
    //   // picture[i].description
    //   console.log("show me the state <<<<<<<<<< ", this.state);
    //   if(pictures) {
    //     this.setState({
    //       pictures: pictures
    //     })
    //   }


    // })
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
      description: this.state.description,
      albumId: this.state.album._id
    }
    //console.log("this is the data being passed -------- ", data);
    // Reuse of the method "addPicture" from the file '../api'
    api.addPicture(this.state.file, data).then(result=>{
      // console.log("the fruits of our labor ---------- ", result)
      this.setState({
        album: result,
        file: '',
        description: ''
      })
      // console.log("show me the state ^^^^^^^^^^^^^^^^^^^^^^^ ", this.state)
    })
    // if(this.state.album) {
    //   api.getPics(this.state.album._id).then(pictures=>{
  
    //     console.log(pictures[0].imageURL)
    //     console.log(pictures[0].description)
  
    //     // loop thru pictures array and take picture[i].imageURL and 
    //     // picture[i].description
    //     console.log("what do i get from the pics ><>><><><><><><><><><><><<<<<><><><> ", pictures);
    //     // this.setState({
    //     //   pictures: pictures
    //     // })
  
  
    //   })
    // }

  }

  showPictures() {
    // console.log("test ...............")
    console.log("................", this.state)
    if(this.state.album) {
      if(this.state.album.pictures.length > 0) {
        // console.log("state pictures ---------------->>>> ", this.state.pictures);
        return this.state.album.pictures.map((picture, i) => {
          console.log("the picture info ------ ", picture)
          if(picture !== null) {
            // console.log("the states picture images >>>>>>>>>>>>>>>>>> ", picture)
            return (
              <div className="post">
                <img key={i} src={picture.imageURL} alt="your pic"/>
                <h4>{picture.description}</h4>
                <button type="button"
        onClick={() =>
        this.removePicture(picture, i)}>Delete</button>
              </div>
            )
          }
        })
      } else {
        // console.log("the else condition ============ ", this.state);
        
        return (
          <h3>Nothing to show</h3>
        )
      }
    }
    // console.log("this is the state ------- ", this.state);
    // this.setState({
      
    // })
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
    // console.log(this.state)
    // console.log("Test")
    return(
      <div>
         <h4>{this.state.title}</h4> 

      {this.showAlbumDetails}
      
      <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="file" name="file" onChange={(e)=>this.handleFileChange(e)} /> <br/>
          <input type="text area" name="description" value={this.state.description} placeholder="description" onChange={(e)=>this.handleChange(e)} /> 
          <button type="submit">Upload</button>
        </form>
      
      <div className= "album-pics">
        {this.showPictures()}

       {/*} <button type="button"
        onClick={() => 
        this.onRemoveItem(this.state.album._id)}>Delete</button> */}
        </div> 
      
      </div>
      
    )
  }
  
  
  
}

