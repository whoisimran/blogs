const Users = require('../database/db');
const blogs = require('../database/blogdb');
const images = require('../database/imagedb');
const comments = require('../database/comment')




module.exports = {
    create: (data,callback)=>{
        let userDetails = new Users(data);
        userDetails.save((err, result) => {
            if(!err){
                return callback(null,result)
            }    
            else{
                return callback(null,err)
            }    
        });
    
    },
      login: (data,callback)=>{
        let email = data.email;
        Users.findOne({email:email},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    create_blog: (data,callback)=>{
        let blog = new blogs(data);
        blog.save((err, result) => {
            if(!err){
                return callback(null,result)
            }    
            else{
                return callback(null,err)
            }    
        });
    
    },
    getblog: (callback)=>{
        blogs.find((err,result)=>{
            if(err){
                return callback(null, err)
            }else{
                return callback(null,result)
            }
        })
    },
    getbyid: (_id,callback)=>{
        Users.findOne({_id},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    getuser: (callback)=>{
        Users.find((err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    create_image: (data,callback)=>{
        let image = new images(data);
        image.save((err, result) => {
            if(!err){
                return callback(null,result)
            }    
            else{
                return callback(null,err)
            }    
        });
    
    },
    createComment: (data,callback)=>{
        let comment = new comments(data);
        comment.save((err, result) => {
            if(!err){
                return callback(null,result)
            }    
            else{
                return callback(null,err)
            }    
        });
    
    },
    getimage: (callback)=>{
        images.find((err,result)=>{
            if(err){
                return callback(null, err)
            }else{
                return callback(null,result)
            }
        })
    },
    getblogbyid: (_id,callback)=>{
        blogs.findOne({_id},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    blogupdatebyid: (data,callback)=>{
        blogs.findByIdAndUpdate(data.id,data,(err,result)=>{
            if(err){
                return callback(null, err)
            }else{
                return callback(null,result)
            }
        })
    },
     deleteblog: (id,callback)=>{
        blogs.findByIdAndDelete(id,(err,result)=>{
            if(err){
                return callback(null,err)
            }else{
                return callback(null,result);
            }
        })
    },
    getcomments: (b_Id,callback)=>{
        comments.find({b_Id},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },

    // getuser: (callback)=>{
    //     students.find((err,result)=>{
    //         if(err){
    //             return callback(null, err)
    //         }else{
    //             return callback(null,result)
    //         }
    //     })
    // },
    // getbyid: (_id,callback)=>{
    //     students.findOne({_id},(err,result)=>{
    //         if(err){
    //             return callback(null,err);
    //         }else{
    //             return callback(null,result);
    //         }
    //     })
    // },
    // updatebyid: (data,callback)=>{
    //     students.findByIdAndUpdate(data.id,data,(err,result)=>{
    //         if(err){
    //             return callback(null, err)
    //         }else{
    //             return callback(null,result)
    //         }
    //     })
    // },
    // deleteuser: (id,callback)=>{
    //     students.findByIdAndDelete(id,(err,result)=>{
    //         if(err){
    //             return callback(null,err)
    //         }else{
    //             return callback(null,result);
    //         }
    //     })
    // }

}