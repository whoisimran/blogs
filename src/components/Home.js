import React,{useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
   let Id =  localStorage.getItem('id');
   const [blog,setBlog] = useState([]);
   const [text,setText] = useState("");
   const [blogId,setBlogid] = useState();
   const [title,setTitle] = useState("");
   const [description,setDescription] = useState("");

   useEffect(()=>{
    allblogs();
   },[])

   const allblogs = async ()=>{
    let response = await fetch(`http://localhost:8080/api/blog`);
    let data = await response.json();
    setBlog(data.message);
   }

   const changehandler = (e)=>{
    setText(e.target.value)
   }

   const get_blog = async (bId)=>{
    let response = await fetch(`http://localhost:8080/api/blog/${bId}`);
    let data = await response.json();

    setBlogid(data.message._id)
     setTitle(data.message.title)
     setDescription(data.message.description)
   }

   const updateblog = async (id)=>{
    let response = await fetch(`http://localhost:8080/api/blog/${id}`,{
          method: "PATCH",
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({title:title,description:description})
        });
        let res = await response.json();
        let close = document.getElementById('close');

        console.log(res)
        close.click();
        allblogs();

   }
   const delete_blog = async (id)=>{
    let response = await fetch(`http://localhost:8080/api/blog/${id}`,{
          method: "DELETE",
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });
        let res = await response.json();
        console.log(res)
        allblogs();

   }

   const cardClick = (id)=>{
      navigate('/blogPage', {state:{id:id}})
   }

  return (
   
    

   <div className="container">
    <div className="text-center mt-5">
        <input type="text" id="search" onChange={changehandler} placeholder="Blog Search..." />
    </div>  
    <h3>All Blogs</h3><hr />  
    <div className="row pt-5">

    {/* Modal code goes here */}

          <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          <div className='form-group'>
                              <label>Title</label>
                              <input className='form-control' type="text" id="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter title" />
                          </div>

                          <div className='form-group'>
                              <label>Enter Description</label>
                              <textarea className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Enter Description"></textarea>
                          </div>

                      </div>
                      <div className="modal-footer">
                          <button type="button" id='close' className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" onClick={()=>updateblog(blogId)} className="btn btn-info">Update</button>
                      </div>
                  </div>
              </div>
          </div>

    {blog.filter((value) => {
                if (text == "") {
                  return value
                } else if (value.title.toLowerCase().includes(text.toLowerCase())) {
                  return value;
                }
              }).map((val,index)=>{
                const description = val.description.split(' ').slice(0, 10).join(' ');

    return (
        
            <div key={index} className="col-md-4">
                <div className="blog_post">
                    <div className="img_pod">
                        <img src={val.image} alt="random image" />
                    </div>
                    <div className="container_copy">
                        <h3>Last updated 3 mins ago</h3>
                        <h1>{val.title}</h1>
                        <p>{description} ...</p>
                        <p>By <span style={{fontWeight: 'Bold'}}>{val.author}</span></p>
                        <button onClick={()=>cardClick(val._id)} className="btn_primary">Read More</button><br />
                        {val.a_Id == Id ?
                        <div className='float-right pt-2'>
                            <button className='btn btn-primary' onClick={()=>get_blog(val._id)} data-toggle="modal" data-target="#exampleModalCenter">Edit</button>&nbsp; &nbsp;
                            <button onClick={()=> delete_blog(val._id)} className='btn btn-danger'>Delete</button>
                        </div>
                        :''}
                    </div>
                    

                </div>
            </div>
       
        )    
    }) }
    </div>
</div>
   
  )
}

export default Home