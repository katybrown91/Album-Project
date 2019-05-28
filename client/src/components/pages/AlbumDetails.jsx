import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Albums from "./Albums";
import api from '../../api';


export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: String,
      imageURL: String,
      description: String,
      album: String
    };
  }

  componentDidMount(){
    console.log(this)
    // api.getMyAlbums().then(albums=>{
    //   console.log("134124123421",albums)
    // })
    //console.log(albumDetails)
    this.setState({
      //albumDetails: allAlbumDetails
    })
  }
  
  deleteAlbums = (i) => {
    let albumsCopy = [ ... this.state.albums ]
    albumsCopy.splice(i,1)
    this.setState( {
      albums: albumsCopy
    } )
  }
  
  render(){
    return(
      <button
      onClick={() => {
        this.deleteAlbums();
      }}> Delete </button>
      
    )
  }
  
  
  
}

