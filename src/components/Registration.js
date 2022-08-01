import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { storage } from "../config";
  import { v4 } from "uuid";
// import { getuser } from '../../Server/api/service';

const Registration = () => {
    const [imageUpload, uploadimg] = useState(null);
    const [data,setData] = useState([])

  useEffect(()=>{
      getuser()
  },[])

  const getuser = async () => {
    let response = await fetch(`http://localhost:8080/api/user`);
    let res = await response.json()
    // console.log(res)
    if (res.success) {
      setData(res.message)
    }

  }
  
    const changehandler = (event) => {
      uploadimg(event.target.files[0]);
    };
  
    const savehandler = async ()=>{
      let email = document.getElementById('email').value;
      const isexist = data.find((item,key)=>{
        return item.email == email;
      }) 
      if(!isexist){
          let name = document.getElementById('name').value;
          let password = document.getElementById('password').value;
          let mobile = document.getElementById('mobile').value;

          const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
          uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {

              let response = await fetch(`http://localhost:8080/api/user`,{
                method: "POST",
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json'
                },
                body : JSON.stringify({name:name,email:email,password:password,mobile:mobile,profile:url})
              });
              let res = await response.json();
              console.log(res)
                
            });
          });
      }else{
        alert('Email Id Already Exist!');
      }
        
        
    }
  return (
    <div className='card'>
      <h3>User Registration</h3>
      <div className='form-group'>
        <label>Enter Your name</label>
        <input className='form-control' type="text" id="name" placeholder="Enter name" />
      </div>

      <div className='form-group'>
        <label>Enter Email Id</label>
        <input className='form-control' type="email" id="email" placeholder="Enter Eamil" />
      </div>

      <div className='form-group'>
        <label>Enter Password</label>
        <input className='form-control' type="password" id="password" placeholder="Enter password" />
      </div>

      <div className='form-group'>
        <label>Enter Mobile No</label>
        <input className='form-control' type="text" id="mobile" placeholder="Enter Mobile No" />
      </div>

      <div className='form-group'>
      <label>Upload Profile Pic</label>
      <input className="form-control" type="file" onChange={changehandler} />
      </div>

      <div className='form-group'>
        
      <button onClick={savehandler} className='btn btn-block btn-success'>Register</button>
      </div>
      <p>Already Register? <Link to='/'>Click here</Link></p>

     </div> 
  )
}

export default Registration