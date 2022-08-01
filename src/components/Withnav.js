import React from 'react'
import NavBar from './Navbar';
import { Outlet } from 'react-router-dom';

const Withnav = () => {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  )
}

export default Withnav