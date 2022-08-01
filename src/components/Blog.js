import React,{useState,useEffect,usenavi} from 'react'
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  let navigate = useNavigate();

  let Id =  localStorage.getItem('id');
   const [data,setdata] = useState({});

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

  const addBlog = async ()=>{
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    let response = await fetch(`http://localhost:8080/api/blog`,{
          method: "POST",
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({a_Id:data._id,title:title,description:description,author:data.name,image:data.profile})
        });
        let res = await response.json();
        console.log(res)

        if(res.success){
            navigate('/home');            
        }else{
            alert('something went wrong!');
        }
  } 
  return (
   <>
    <div className='card'>
      <h3 align="center">Add a New Blog</h3>
      <div className='form-group'>
        <label>Title</label>
        <input className='form-control' type="text" id="title" placeholder="Enter title" />
      </div>

      <div className='form-group'>
        <label>Enter Description</label>
        <textarea className="form-control" id="description" placeholder="Enter Description"></textarea>
      </div>

      <div className='form-group'>
        <label>Blog Author</label>
        <input className='form-control' type="text" id="author" value={data.name}  readOnly />
      </div>

      <div className='form-group'>
        <label>Author Profile URL</label>
        <input className='form-control' type="text" id="image" value={data.profile} readOnly/>
      </div>

     
      <div className='form-group'>
        
      <button onClick={addBlog} className='btn btn-block btn-info'>Add Blog</button>
      </div>
      

     </div>
   </>
  )
}

export default Blog