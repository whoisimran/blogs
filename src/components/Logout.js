import React from 'react'
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    
    localStorage.clear();
    let navigate = useNavigate();
    navigate('/'); 

  return (
   <div></div>
  )
}

export default Logout