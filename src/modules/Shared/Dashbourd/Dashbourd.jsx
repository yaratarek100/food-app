import React from 'react'
import Header from "./../../../modules/Shared/Header/Header";
import FillRecipes from '../FillRecipes/FillRecipes';


export default function Dashbourd() {
  return (
    <>
              <Header title={"wellcome"} home={true}></Header>
              <FillRecipes></FillRecipes>
      
    </>
  )
}
