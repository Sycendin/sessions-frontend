import React from "react";

import './Profile.css'

const Profile = ( {isProfileOpen, toggleModal}) =>{
    
    return (
    <div className="profile-modal">
                   <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80 w-80">
            <img src="http://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar"/>
            <h1>John Ponto</h1>
            <h4>Images Submitted: 6</h4>
            <p>Member since: January</p>
            <hr></hr>
 
 
            <label className="mt2 fw6" htmlFor="user-name">Name:</label>
            <input
            // onChange={this.onNameChange}
            className="pa2 ba w-100" type="text" 
            name="user-name"  id="name" placeholder="John"/>
            <label className="mt2 fw6" htmlFor="user-name">Age:</label>
            <input
            // onChange={this.onNameChange}
            className="pa2 ba w-100" type="text" 
            name="user-age"  id="age" placeholder="22"/>
            <label className="mt2 fw6" htmlFor="user-name">Color:</label>
            <input
            // onChange={this.onNameChange}
            className="pa2 ba w-100" type="text" 
            name="user-color"  id="color" placeholder="Red"/>
            
         <div className="'mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
             <button className="mt4 b pa2 grow pointer hover-white w-40 bg-light-green b--black-20">
                 Save
             </button>
             <button onClick= {toggleModal} className=" mt4 b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
             >
                 Cancel
             </button>
            
         </div>
            
       
</main>
<div className="modal-close" onClick={toggleModal}>&times;</div>
</article>
    </div>
    );
}
export default Profile;