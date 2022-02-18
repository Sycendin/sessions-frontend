import React from "react";
class ProfileIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }
    render() {
        return (
            <div className="tc pa4">
                <img src="http://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar"/>
             </div> 
        )
    }
}
export default ProfileIcon;