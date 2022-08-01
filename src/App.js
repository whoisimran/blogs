import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import Image from './components/Image';
import Login from './components/Login';
import Registration from './components/Registration'
import Blogpage from './components/Blogpage';
import WithoutNav from './components/Withoutnav';
import Withnav from './components/Withnav';
// import Logout from './components/Logout';
import { gapi } from 'gapi-script';
import './App.css';

const clientId = '250461309435-vtkrfipbnkaldifa38bhggmda99brfnu.apps.googleusercontent.com';


function App() {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  })

  return (
  <> 
    <Router>
    <Routes>
    <Route element={<WithoutNav />}>
      <Route exact path='/' element={< Login />} />
    </Route>
    <Route element={<WithoutNav />}>
      <Route exact path='/registration' element={< Registration />} />
    </Route>

    <Route element={<Withnav />}>
      <Route exact path='/home' element={< Home />} />
    </Route>
    <Route element={<Withnav />}>
      <Route exact path='/blog' element={< Blog />} />
    </Route>

    <Route element={<Withnav />}>
      <Route exact path='/gallery' element={< Gallery />} /> 
    </Route>

    <Route element={<Withnav />}>
      <Route exact path='/image' element={< Image />} />
    </Route>
    <Route element={<Withnav />}>
      <Route exact path='/blogPage' element={< Blogpage />} />
    </Route>
    {/* <Route element={<Withnav />}>
      <Route exact path='/logout' element={< Logout />} />
    </Route> */}
      
    </Routes>
    </Router>
  
     </>
   
  );
}

export default App;
