import React,{useState,useEffect} from 'react'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../config";
import { v4 } from "uuid";

const Image = () => {

  let Id =  localStorage.getItem('id');
  const [data,setdata] = useState({});
  const [imageUpload,uploadimg] = useState(null);

  useEffect(()=>{
    getuser();
  },[])

  const getuser = async ()=>{
   let response = await fetch(`http://localhost:8080/api/user/${Id}`);
   let res = await response.json();
   if(res.success){
     setdata(res.message)
   }
  }

  const changehandler = (event) => {
    uploadimg(event.target.files[0]);
   
   
  }

  const addImage = async ()=>{
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        let response = await fetch(`http://localhost:8080/api/image`,{
          method: "POST",
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({a_Id:data._id,title:title,description:description,author:data.name,image:url})
        });
        let res = await response.json();
        console.log(res)
      })
    })

    

       
  } 

  return (
    <div className='card'>
    <h3 align="center">Add a New Image</h3>
    <div className='form-group'>
      <label>Title</label>
      <input className='form-control' type="text" id="title" placeholder="Enter title" />
    </div>

    <div className='form-group'>
      <label>Enter Description</label>
      <textarea className="form-control" id="description" placeholder="Enter Description"></textarea>
    </div>

    <div className='form-group'>
      <label>Photo By</label>
      <input className='form-control' type="text" id="author" value={data.name}  readOnly />
    </div>

    <div className='form-group'>
      <label>Upload Image</label>
      <input className="form-control" type="file" onChange={changehandler}/>
      </div>

   
    <div className='form-group'>
      
    <button onClick={addImage} className='btn btn-block btn-primary'>Add Image</button>
    </div>
    

   </div>
  )
}

export default Image