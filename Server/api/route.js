const {insert,login,getuser,create_blog,getblog,getbyid,create_image,getimage,getblogbyid,blogupdatebyid,deleteblog,getcomments,createComment} = require('./controller')
const Router = require('express').Router();

Router.post('/api/user',insert);
Router.post('/api/user/login',login);
Router.get('/api/user',getuser);
Router.get('/api/user/:id',getbyid);
Router.post('/api/blog',create_blog);
Router.get('/api/blog',getblog);
Router.get('/api/blog/:id',getblogbyid);
Router.patch('/api/blog/:id',blogupdatebyid);
Router.delete('/api/blog/:id',deleteblog);
Router.post('/api/image',create_image);
Router.get('/api/image',getimage);

Router.post('/api/comments',createComment);

Router.get('/api/comments/:b_Id',getcomments);


module.exports = Router;