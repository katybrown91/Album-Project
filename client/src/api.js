import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  // This is an example on how to use this method in a different file
  // api.getPictures().then(pictures => { /* ... */ })
  getNewsfeed() {
    return service
      .get('/newsfeed')
      .then(res => res.data)
      .catch(errHandler)
  },

  addPhoto(body) {
    return service
      .post('/imageUpload', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  getSecret() {
    return service
      .get('/profile')
      .then(res => res.data)
      .catch(errHandler)
  },


// formData.body = file.description
  addPicture(file, items) {
    const formData = new FormData()
    formData.append("picture", file)
    console.log(" the form data ---------- ", formData, " ======================= ", items);
    return service
      .post('/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log("the res.data after file upload -------------- ", res.data)
        items.imageInfo = res.data.saved
        return this.updatePic(items)
      })
      .catch(errHandler)
  },

  updatePic(info) {
    console.log("the info when updating the pic >>>>>>>>>>>>>>> ", info)
    return service
    .post('/updatePhoto', info)
    .then(res => res.data)
    .catch(errHandler)
  },

  getPics(){
    /*    Axios.get('http://localhost:5000/api/pictures').then(allYourPics=>{
      console.log(allYourPics)
    })*/
    return service
      .get('/pictures')
      .then(res => res.data)
      .catch(errHandler)    

  },

  saveAlbum(album){
    return service
    .post('/newalbum', album)
    .then(res => res.data)
    .catch(errHandler)    
  },
  getMyAlbums(){
    console.log("is this working????")
    return service
      .get('/viewAlbums')
      .then(res => res.data)
      .catch(errHandler)    

  },

}
