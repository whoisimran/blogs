import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
// import { getuser } from '../../Server/api/service';

const Login = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    getuser();

  }, [])

  const getuser = async () => {
    let response = await fetch(`http://localhost:8080/api/user`);
    let res = await response.json()
    // console.log(res)
    if (res.success) {
      setData(res.message)
    }

  }
  // console.log(data)

  const loginhandle = async () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let response = await fetch(`http://localhost:8080/api/user/login`, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    });
    let res = await response.json();
    if (res.success) {
      localStorage.setItem('id', res.message._id);
      navigate('/home');
    } else {
      alert('Invalid Login Details!');
    }
  }

  const responseGoogle = async (response) => {
    const isexist = data.find((item,key)=>{
      return item.email == response.profileObj.email
    }) 
    if(!isexist){
      let result = await fetch(`http://localhost:8080/api/user`, {
        method: "POST",
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: response.profileObj.name, email: response.profileObj.email, password: response.profileObj.googleId, mobile: '6523657565', profile: response.profileObj.imageUrl })
      });
      let res = await result.json();
      console.log(res)
      if (res.success) {
        localStorage.setItem('id', res.message._id);
        navigate('/home');
      } else {
        alert('Invalid Login Details!');
      }
    }else{
      localStorage.setItem('id', isexist._id);
        navigate('/home');
    }
   


  }
  const responserror = (response) => {
    console.log("error", response);
  }


  return (
    <div className='card'>
      <h3>User Login</h3>

      <div className='form-group'>
        <label>Enter Email Id</label>
        <input className='form-control' type="email" id="email" placeholder="Enter Eamil" />
      </div>

      <div className='form-group'>
        <label>Enter Password</label>
        <input className='form-control' type="password" id="password" placeholder="Enter password" />
      </div>

      <div className='form-group'>
        <button onClick={loginhandle} className='btn btn-block btn-success'>Login</button>
      </div>
      <p>Not Register? <Link to='/registration'>Click here</Link></p>

      <GoogleLogin
        clientId="250461309435-vtkrfipbnkaldifa38bhggmda99brfnu.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responserror}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />

    </div>
  )
}

export default Login