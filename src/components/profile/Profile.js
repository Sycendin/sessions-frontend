import React from "react";

import './Profile.css'

class  Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            color: this.props.user.color
        }
    }
    onFormChange = (event) => {
        switch(event.target.name){
            case 'user-name':
                this.setState({name: event.target.value});
                break;
            case 'user-age':
                this.setState({age: event.target.value});
                break
            case 'user-color':
                this.setState({color: event.target.value})
                break;
            default:
                return;
        }
    }

    onProfileUpdate = (data) => {
        fetch(`http://localhost:3002/profile/${this.props.user.id}`,
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formInput: data})
        })
        .then(response => {
            this.props.toggleModal();
            this.props.loadUser({...this.props.user, ...data})
        })
        .catch(console.log)
    }
   render(){
       const {user} = this.props;
       const {name, age, color} = this.state;
    return (
        <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                <img src="http://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar"/>
                <h1>{this.state.name}</h1>
                <h4>{`Images Submitted: ${user.entries}`}</h4>
                <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                <hr></hr>
     
     
                <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                <input onChange={this.onFormChange}
                // onChange={this.onNameChange}
                className="pa2 ba w-100" type="text" 
                name="user-name"  id="name" placeholder={user.name}/>
    
                <label className="mt2 fw6" htmlFor="user-name">Age:</label>
                <input onChange={this.onFormChange}
                // onChange={this.onNameChange}
                className="pa2 ba w-100" type="text" 
                name="user-age"  id="age" placeholder={user.age}/>
    
                <label className="mt2 fw6" htmlFor="user-name">Color:</label>
                <input onChange={this.onFormChange}
                // onChange={this.onNameChange}
                className="pa2 ba w-100" type="text" 
                name="user-color"  id="color" placeholder={user.color}/>
                
             <div className="'mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                 <button onClick= {() => this.onProfileUpdate({name, age, color})} className="mt4 b pa2 grow pointer hover-white w-40 bg-light-green b--black-20">
                     Save
                 </button>
                 <button onClick= {this.props.toggleModal} className=" mt4 b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                 >
                     Cancel
                 </button>
                
             </div>
                
           
    </main>
    <div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
    </article>
        </div>
        );
   } 

    
  
}
export default Profile;