import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login';
// import Filter from './Filter';
const Navbar = () => {
    let navigate = useNavigate();
   const logout = (res)=>{
    console.log(res);
    localStorage.clear();
    
    navigate('/'); 
    
   }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Blog App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">New Blog</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/image">New Image</Link>
                        </li>
                        <li className="nav-item">
                        <GoogleLogout
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                        >
                        </GoogleLogout>
                        </li>
                        
                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Navbar