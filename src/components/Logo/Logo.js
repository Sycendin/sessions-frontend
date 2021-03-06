import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.jpg'


const Logo = () => {
    return (
        <div className="ma4 mt0 f1 w-20">
            <Tilt tiltMaxAngleX={30} tiltMaxAngleY={30} >
                <div className = 'Tilt'  style={{ height: '200px',
                 width: '200px' ,display:'flex', justifyContent:'center', paddingTop:'35px'}}>
                    <img style={{ height:'130px'}}alt= 'logo' src={brain}></img>
                </div>
            </Tilt>
        </div>



    );
}

export default Logo;