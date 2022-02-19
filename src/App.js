
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { Fragment } from 'react/cjs/react.production.min';
import Particles from "react-tsparticles";
import FaceRecogntion from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/profile/Profile';
import './App.css';



const intialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    isPofileOpen: false,
    user: {
      id: '',
      name: '',
      password: '',
      email: '',
      entries: 0,
      joined: '',
      color: '',
      age: ''
    }
}

class App extends Component {
  constructor(){
    super()
    this.state = intialState
}

componentDidMount(){
  const token = window.sessionStorage.getItem('token')
  if (token){
    fetch('http://localhost:3002/signin' , {
      method: 'post',
      headers: {
        'content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data && data.id){
        fetch(`http://localhost:3002/profile/${data.id}` , {
          method: 'get',
          headers: {
            'content-Type': 'application/json',
            'Authorization': token
          }
        })
        .then(response => response.json())
        .then(user => {
          if (user && user.email){
            this.loadUser(user)
            this.onRouteChange('home')
          }
        })
      }
    })
    .catch(console.log)
  }
}
loadUser =(data)=>{
this.setState({ user:
  {
    id: data.id,
    name: data.name,
    password: data.password,
    email: data.email,
    entries: data.entries,
    joined: data.joined
}})
}
calculateFaceLocations = (data)  => {
  return data.outputs[0].data.regions.map(face=>{
    const clarifaFace = face.region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaFace.left_col * width,
      topRow: clarifaFace.top_row * height,
      rightCol: width - (clarifaFace.right_col * width),
      bottomRow: height - (clarifaFace.bottom_row * height)
    }
  })

}


displayFaceBoxes = (boxes) => {

  this.setState({boxes: boxes})
}
onInputChange = (event) =>{
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  //  console.log('click')
  this.setState({imageUrl: this.state.input})
  // send the input to the imageurl that will do the clarifai call
  // fetch('https://obscure-forest-18294.herokuapp.com/imageurl', {
    fetch('http://localhost:3002/imageurl', {  
    method: 'post',
    headers: {'content-Type': 'application/json'},
    body: JSON.stringify({
      input: this.state.input
    })
  })
  // get json from server and then make another fetch to the imageurl
  .then(response => response.json())
  .then(response => {
    if (response){
      // fetch('https://obscure-forest-18294.herokuapp.com/image', {
        fetch('http://localhost:3002/image', {  
        method: 'put',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user,{ entries:count }))
    })
    .catch(console.log);
    }
     this.displayFaceBoxes(this.calculateFaceLocations(response))
    })
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
  .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if (route === 'signout'){
    return this.setState(intialState)
  }
  else if (route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}
toggleModal = () =>{
  this.setState(prevState => ({
    ...prevState,
    isPofileOpen: !prevState.isPofileOpen
  }))
}
  render() {
   const {isSignedIn, imageUrl, route, boxes, isPofileOpen, user} = this.state
    return (
  <Fragment>
    <div className="App">
    <Particles 
        options={{

          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#B5F629",
            },
            links: {
              color: "#4B6612",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}
      toggleModal={this.toggleModal}/>
     {/* && shorthand for ternary with one true */}
      {isPofileOpen && <Modal>
         <Profile isPofileOpen={isPofileOpen} toggleModal={this.toggleModal} loadUser={this.loadUser}
         user={user}/>
       </Modal>}     
      { route === 'home' 
       ?<div>
       <Logo />
 
       <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
       <FaceRecogntion boxes={boxes} imageUrl={imageUrl}/>
       </div> 
      :( 
        route === 'signin'
      ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
       
      }
    </div>
    </Fragment>
  );
}
}
export default App;
