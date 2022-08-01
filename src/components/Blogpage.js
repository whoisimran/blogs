import { async } from '@firebase/util';
import React,{useState,useEffect} from 'react'
import {useLocation } from 'react-router-dom';
// import { getcomments } from '../../Server/api/service';
// import { getblog } from '../../Server/api/service';

const Blogpage = (props) => {
    const location = useLocation();
    let Id = location.state.id;
    let userId =  localStorage.getItem('id');

    const [data,setdata] = useState({});
    const [comments,setComments] = useState([])
    const [userdata,setUserdata] = useState({})
    const [likes, setLikes] = useState(100);
    const [isClicked, setIsClicked] = useState(false);
   
    

    useEffect(()=>{
        getblog()
        getcomments();
        getuser();
    },[])

    const getuser = async ()=>{
        let response = await fetch(`http://localhost:8080/api/user/${userId}`);
        let res = await response.json();
        if(res.success){
            setUserdata(res.message)
        }
       }

    const getblog = async()=>{
        let response = await fetch(`http://localhost:8080/api/blog/${Id}`);
        let res = await response.json();
        setdata(res.message)
    }

    const getcomments = async ()=>{
        let response = await fetch(`http://localhost:8080/api/comments/${Id}`);
        let res = await response.json();
        console.log("first>>", res)
        // setdata(res.message)
        setComments(res.message)
    }

    const send = async () =>{
        let comment = document.getElementById('comment').value;
        if(comment == ''){
            alert('Please Enter Comments!')
        }else{
            let response = await fetch(`http://localhost:8080/api/comments`,{
                method: "POST",
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json'
                },
                body : JSON.stringify({comment:comment,b_Id:Id,name:userdata.name,image:userdata.profile})
              });
            let res = await response.json();
            console.log(res);
            getcomments();
        }
    }

    const handleClick = () => {
      let btn = document.getElementsByClassName('likes-counter')[0];

        if (isClicked) {
          setLikes(likes - 1);
          btn.innerHTML = 'Like';
        } else {
          setLikes(likes + 1);
          btn.innerHTML = 'Liked';
        }
        setIsClicked(!isClicked);
      };
 
  return (
<div className='container'>
<div className="card2 mb-3">
  <img className="card-img-top" src="https://r1imghtlak.mmtcdn.com/816d3e6096ca11eca06a0a58a9feac02.jpg?&output-quality=75&downsize=910:612&crop=910:612;0,35&output-format=jpg" alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">{data.title}</h5>
    <p className="card-text">{data.description}</p>
    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small> &nbsp; 
     <button className={ `like-button ${isClicked && 'liked'} btn btn-dark` } onClick={ handleClick }>
      <span className="likes-counter">Like</span>
    </button></p>
    <p>Likes: {likes}</p>
    <div className="float-right">
        <textarea className='form-control' id='comment' placeholder='Comment'></textarea>
        <button className='btn btn-info float-right mt-2' onClick={send}>Send</button>
    </div>
  </div>
  <br /><br /><br />
  <div className="wrap_comment">
   {comments.map((val,index)=>{
    return (
        <div className="blog_post" key={index}>
        <div className="img_pod2">
            <img src={val.image}  alt="random image" />
        </div>
        <div className="comment_wrap2">
        <p>By: <span style={{fontWeight:'bold'}}>{val.name}</span></p><br />
        <p>{val.comment}</p> 
        </div>
    </div>
    )
         
   })}
  </div>            
              
            
  
</div>
</div>
  )
}

export default Blogpage