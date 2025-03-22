import React from "react";
import Header from "../Header/Header";
import FillRecipes from "../FillRecipes/FillRecipes";

export default function Home() {
  const userRole = JSON.parse(localStorage.getItem("loginData")).userGroup;
  return (
    <>
      <Header title={"welcome"} home={true}></Header>
    {userRole=="SystemUser"?
    <FillRecipes buttonContent={"Recipes"} action={"Show"} ></FillRecipes> 
    :
    <FillRecipes buttonContent={"Fill Recipes"} action={"Fill"} ></FillRecipes> 
    }
    </>
  );
}
