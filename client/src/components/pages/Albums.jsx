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
              <Link to={`albumDetails/${eachAlbum._id}`}>Details</Link>
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
  onRemoveItem = id => {
    this.setState(state => {
      const albumList = state.albumList.filter(item => item.id !== id);

      return {
        albumList,
      };
    });
  };
  render() {
    return (
      <div className="Albums">
        {this.state.album}
        <form onSubmit={this.makeNewAlbum}>
          <input type="text" onChange={this.settingAlbum}  name="name"/>
         
          <button >Create An Album</button>
        </form>
        {this.showAlbums()}
        
        <ul>
          {this.state.albumList.map(item => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => this.onRemoveItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
