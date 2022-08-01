const {create,login,create_blog,getblog,getbyid,create_image,getimage,getblogbyid,blogupdatebyid,deleteblog,getuser,getcomments,createComment} = require('./service');

module.exports = {
    insert: (req,res,next)=>{  
        let body = req.body;
        create(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message: err})
            }else{
                res.status(200).json({success:true,message: result})

            }
        })
    },
    login: (req,res)=>{
        let body = req.body;
        login(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'Invalid Login Details!'})
                }else{
                    if(body.password == result.password){
                        res.status(200).json({success:true, message:result})
                    }else{
                        res.status(400).json({success:false, message:'Invalid Login Details!'})

                    }

                }
            }
        })

    },
    getuser: (req,res)=>{
        getuser((err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
               
                res.status(200).json({success:true,message:result})
            }
        })
    },
    create_blog: (req,res)=>{
        let body = req.body;
        create_blog(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message: err})
            }else{
                res.status(200).json({success:true,message: result})

            }
        })
    },
    createComment: (req,res)=>{
        let body = req.body;
        createComment(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message: err})
            }else{
                res.status(200).json({success:true,message: result})

            }
        })
    },
    getblog: (req,res)=>{
        getblog((err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
               
                res.status(200).json({success:true,message:result})
            }
        })
    },
    getbyid: (req,res)=>{
        let _id = req.params.id;
        getbyid(_id,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'user Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    create_image: (req,res,next)=>{  
        let body = req.body;
        create_image(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message: err})
            }else{
                res.status(200).json({success:true,message: result})

            }
        })
    },
    getimage: (req,res)=>{
        getimage((err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
               
                res.status(200).json({success:true,message:result})
            }
        })
    },
    getblogbyid: (req,res)=>{
        let _id = req.params.id;
        getblogbyid(_id,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'Blog Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    blogupdatebyid: (req,res)=>{
        let id = req.params.id;
        let body = req.body;
        body.id = id;
        blogupdatebyid(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'Blog Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    deleteblog: (req,res)=>{
        let id = req.params.id;
        deleteblog(id,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'Blog Not found'})
                }else{createComment
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    getcomments: (req,res)=>{
        let b_Id = req.params.b_Id;
        getcomments(b_Id,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'Comments Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },

}