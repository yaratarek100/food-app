import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebarr/Sidebarr'
import Navbar from './../Navbar/Navbar';


export default function Masterlayout({loginData,saveLoginData}) {



  return (
    <div className='master d-flex '>
      <div className="SidebarDiv  ">

      <Sidebar></Sidebar>
      </div>
      <div className="mainDiv p-3 position-relative" >
<Navbar ></Navbar>
<Outlet  ></Outlet>
      </div>

    </div>
  )
}
