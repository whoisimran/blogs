import React,{useState,useEffect} from 'react'

const Gallery = () => {
  const [image,setImage] = useState([]);
  const [text,setText] = useState("");

  useEffect(()=>{
   allimages();
  },[])

  const allimages = async ()=>{
   let response = await fetch(`http://localhost:8080/api/image`);
   let data = await response.json();
   console.log(data)
   setImage(data.message);
  }
  const changehandler = (e)=>{
    setText(e.target.value)
   }
  return (
    <div className="container">
      <div className="text-center mt-5">
        <input type="text" id="search" onChange={changehandler} placeholder="Image Search..." />
    </div>  
    <h3>All Images</h3><hr /> 
      <div className="row">
      {image.filter((value) => {
                if (text == "") {
                  return value
                } else if (value.title.toLowerCase().includes(text.toLowerCase())) {
                  return value;
                }
              }).map((val,index)=>{
        return (
          
            <div key={index} className="col-md-4">
              <div className="wrapper">
                <img src={val.image} alt={val.title} style={{width:"100%"}} />
                <div className="card-body">
                    <h4 className="card-title">{val.title}</h4><hr />
                    <h6 className="card-text">Photo By {val.author}</h6><hr />
                    <p><span style={{fontWeight:"bold"}}>Description:</span> {val.description}</p>
                </div>
              </div>
            </div>
          
        )
      })}
      </div>
    </div>
  )
}

export default Gallery