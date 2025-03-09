import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import sideBarLogo from "./../../../assets/3.svg";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "../../Auth/change-password/change-password";

export default function Sidebarr() {
  const [collapsedState, setCplapsedState] = useState(false);
  let togelColapse = () => {
    setCplapsedState(!collapsedState);
  };

  let navigate = useNavigate();
  let signout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

const [showChangePassword, setshowChangePassword] = useState(false)
  return (
    <>
    <Sidebar collapsed={collapsedState}>
      <Menu >
        <MenuItem
          onClick={togelColapse}
          icon={<img src={sideBarLogo} />}
          className="mb-4 m-2"
        >
          
        </MenuItem>
       
        <MenuItem
          onClick={()=>{setshowChangePassword(false)}}
          component={<Link to="/dashboard" />}
          icon={<i className="fa-solid fa-house"></i>}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={()=>{setshowChangePassword(false)}}
          component={<Link to="users-list" />}
          icon={<i className="fa-solid fa-users"></i>}
        >
          Users
        </MenuItem>
        <MenuItem
        onClick={()=>{setshowChangePassword(false)}}
          component={<Link to="recipes-list" />}
          icon={<i className="fa-solid fa-calendar-days"></i>}
        >
          Recipes
        </MenuItem>
        <MenuItem
        onClick={()=>{setshowChangePassword(false)}}
          component={<Link to="categories-list" />}
          icon={<i className="fa-solid fa-lock"></i>}
        >
          Categories
        </MenuItem>
        <MenuItem
         onClick={()=>{setshowChangePassword(!showChangePassword)}}
          icon={<i className="fa-solid fa-table-cells-large"></i>}
        >
          Change Password
        </MenuItem>
        <MenuItem
          onClick={signout}
          icon={<i className="fa-solid fa-right-from-bracket"></i>}
        >
          Signout
        </MenuItem>
      </Menu>
    </Sidebar>
    <ChangePassword show={showChangePassword} setShow={setshowChangePassword}/>
    </>
  );
}



// menuItemStyles={{
//   button: {
//     // the active class will be added automatically by react router

//     // so we can use it to style the active menu item

//     [`&.active`]: {
//       backgroundColor: "#13395e",

//       color: "#b6c8d9",
//     },
//   },
// }}
