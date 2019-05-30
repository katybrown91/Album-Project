import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Axios from "axios";
import api from "../../api";

export default class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: String,
      imageURL: String,
      description: String,
      album: String,
      albums: []
    };
  }
  componentDidMount(){
    api.getMyAlbums().then(albums=>{
      console.log("134124123421",albums)
      this.setState({albums: albums.Albums})
    })
  }

  createAlbums() {
    if (this.state.albums) {
      return this.state.albums.map((album, i) => {
        if (album.title) {
          return <div className="Albums" />;
        }
      });
    }
  }

  settingAlbum = (e) => {
    this.setState({album:e.target.value})
  }

  showAlbums = () => {
    return this.state.albums.map((eachAlbum,i)=>{
      return <li key={i}> { eachAlbum.title} 
              <Link to={`albumDetails/${eachAlbum._id}`}>View Album</Link>
          
              <button type="button"
        onClick={() => 
        // this.removeAlbum(this.state.album._id)}>Delete</button> 
        this.removeAlbum(eachAlbum, i)}>Delete</button> 
     

            </li>
    })
  }

  makeNewAlbum = (e) => {
    e.preventDefault()
    let newAlbum = {title: this.state.album}
    api.saveAlbum(newAlbum).then(album=>{
      console.log(album, this)
      this.props.history.push(`album/${album.response._id}`)
    })
  }
  /*onRemoveItem = id => {
    this.setState(state => {
      console.log(state)
      const album = state.albums.filter(album=> album.id !== id);
      console.log(album.id)

      return {
        album,
      };
    });
  }; 
  */

 removeAlbum(album, index) {


  api.deleteAlbum(album._id).then(res=>{
    const newAlbums = [...this.state.albums];

    newAlbums.splice(index, 1); //pull out specific index
    console.log(index)
    console.log(newAlbums)
    this.setState({
      albums: newAlbums //update the albums array to be the same array, except for
            //the one we spliced
    })
  })
 
}

      
  
  render() {
    return (
      <div className="Albums">
        <div className= "albums">
        {this.state.album}
        
        {this.showAlbums()}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="home-pics">
        <img src={"./images/camera.jpg"} alt="camera" width="100vw" height="100vh"/> <br></br><br></br><br></br>
        <img src={"./images/book.png"} alt="book" width="100vh" height="100vh" /> <br></br><br></br><br></br>
        <img src={"./images/screens.png"} alt="screens" width="100vh" height="100vh" />
</div>
        </div>
        
      </div>
    );
  }
}
