import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './modules/Auth/Signin/Signin.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authlayout from './modules/Shared/Authlayout/Authlayout.jsx';
import Signup from './modules/Auth/Signup/Signup';
import Verify from './modules/Auth/Verify/Verify';
import ForgetPass from './modules/Auth/Forget-pass/Forget-pass';
import ChangePass from './modules/Auth/Change-pass/Change-Pass';
import ResetPass from './modules/Auth/Reset-pass/Reset-pass';
import Notfound from './modules/Shared/Notfound/Notfound';
import Dashbourd from './modules/Shared/Dashbourd/Dashbourd.jsx'
import Masterlayout from './modules/Shared/Masterlayout/Masterlayout';
import RecipesList from './modules/Recipes/Recipes-list/Recipes-list.jsx'
import RecipesData from './modules/Recipes/Recipes-data/Recipes-data';
import CategoriesList from './modules/categories/categories-list/categories-list';
import CategoriesData from './modules/categories/categories-data/categories-data';
import UsersList from './modules/Users/Users-list/Users-list';

function App() {

  const routs = createBrowserRouter([
    {
      path : '/',      
      element :<Authlayout></Authlayout>,
      errorElement : <Notfound></Notfound>,
      children:[
        {path :'' ,element :<Signin></Signin>},
        {path : 'login' ,element :<Signin></Signin>},
        {path : 'signup' ,element :<Signup></Signup>},
        {path : 'verify-account' ,element :<Verify></Verify>},
        {path : 'forge-password' ,element :<ForgetPass></ForgetPass>},
        {path : 'change-password' ,element :<ChangePass></ChangePass>},
        {path : 'reset-password' ,element :<ResetPass></ResetPass>},
      ]
    },
    { 
      path :'/dashboard',      
      element :<Masterlayout></Masterlayout>,
      errorElement : <Notfound></Notfound>,
      children:[
        {index :true ,element :<Dashbourd></Dashbourd>},
        {path : 'Recipes-list' ,element :<RecipesList></RecipesList>},
        {path : 'Recipe-data' ,element :<RecipesData></RecipesData>},
        {path : 'categories-list' ,element :<CategoriesList></CategoriesList>},
        {path : 'category-data' ,element :<CategoriesData></CategoriesData>},
        {path : 'users-list' ,element :<UsersList></UsersList>},
      ]
    }
  ])

  return (
    <>
   
<RouterProvider router={routs} ></RouterProvider>
    </>
  )
}

export default App
