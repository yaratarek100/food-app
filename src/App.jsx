import "./App.css";
import Signin from "./modules/Auth/Signin/Signin.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Authlayout from "./modules/Shared/Authlayout/Authlayout.jsx";
import Verify from "./modules/Auth/Verify/Verify";
import ForgetPass from "./modules/Auth/Forget-pass/Forget-pass";
import ResetPass from "./modules/Auth/Reset-pass/Reset-pass";
import Notfound from "./modules/Shared/Notfound/Notfound";
import Dashbourd from "./modules/Shared/Dashbourd/Dashbourd.jsx";
import Masterlayout from "./modules/Shared/Masterlayout/Masterlayout";
import RecipesList from "./modules/Recipes/Recipes-list/Recipes-list.jsx";
import RecipesData from "./modules/Recipes/Recipes-data/Recipes-data";
import CategoriesList from "./modules/categories/categories-list/categories-list";
import CategoriesData from "./modules/categories/categories-data/categories-data";
import UsersList from "./modules/Users/Users-list/Users-list";
import ProtectedRoute from "./modules/Shared/protectedRoute/protectedRoute.jsx";
import { LoginDataProvider } from "./context/LoginDataContext.jsx";
import ChangePassword from "./modules/Auth/change-password/change-password.jsx";

function App() {
  // const [loginData, setLoginData] = useState({});

  // const saveLoginData =  () => {
  //   let encodedToken = localStorage.getItem("token");
  //   let decodedToken =  jwtDecode(encodedToken);

  //   setLoginData(decodedToken);
  //   console.log("save");
  // };

  const routs = createBrowserRouter([
    {
      path: "/",
      element: <Authlayout></Authlayout>,
      errorElement: <Notfound></Notfound>,
      children: [
        { path: "", element: <Signin ></Signin> },
        {
          path: "login",
          element: <Signin ></Signin>,
        },
        { path: "verify-account", element: <Verify></Verify> },
        { path: "forget-password", element: <ForgetPass></ForgetPass> },
        { path: "reset-password", element: <ResetPass></ResetPass> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Masterlayout
            
            
          ></Masterlayout>
        </ProtectedRoute>
      ),
      errorElement: <Notfound></Notfound>,
      children: [
        { index: true, element: <Dashbourd></Dashbourd> },

        { path: "recipes-list", element: <RecipesList></RecipesList> },
        { path: "recipe-data", element: <RecipesData></RecipesData> },
        { path: "categories-list", element: <CategoriesList></CategoriesList> },
        { path: "category-data", element: <CategoriesData></CategoriesData> },
        { path: "users-list", element: <UsersList></UsersList> },
      ],
    },
  ]);

  return (
    <>
      <LoginDataProvider>
        <RouterProvider router={routs}>
          <App></App>
        </RouterProvider>
        <ToastContainer />
      </LoginDataProvider>
    </>
  );
}

export default App;
