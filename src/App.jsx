import "./App.css";
import Signin from "./modules/Auth/Signin/Signin.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Authlayout from "./modules/Shared/Authlayout/Authlayout.jsx";
import Verify from "./modules/Auth/Verify/Verify";
import ForgetPass from "./modules/Auth/Forget-pass/Forget-pass";
import ResetPass from "./modules/Auth/Reset-pass/Reset-pass";
import Notfound from "./modules/Shared/Notfound/Notfound";
import Dashbourd from "./modules/Shared/Home/Home.jsx";
import Masterlayout from "./modules/Shared/Masterlayout/Masterlayout";
import RecipesList from "./modules/Recipes/Recipes-list/Recipes-list.jsx";
import RecipesData from "./modules/Recipes/Recipes-data/Recipes-data";
import CategoriesList from "./modules/categories/categories-list/categories-list";
import UsersList from "./modules/Users/Users-list/Users-list";
import ProtectedRoute from "./modules/Shared/protectedRoute/protectedRoute.jsx";
import { LoginDataProvider } from "./context/LoginDataContext.jsx";
import Signup from "./modules/Auth/Signup/Signup.jsx";
import Favorites from "./Components/Favorites/Favorites.jsx";
import Home from "./modules/Shared/Home/Home.jsx";

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
        { path: "", element: <Signin></Signin> },
        {
          path: "login",
          element: <Signin></Signin>,
        },
        { path: "signup", element: <Signup></Signup> },
        { path: "verify-account", element: <Verify></Verify> },
        { path: "forget-password", element: <ForgetPass></ForgetPass> },
        { path: "reset-password", element: <ResetPass></ResetPass> },
      ],
    },
    {
      path: "/home",
      element: (
        
          <Masterlayout></Masterlayout>
        
      ),
      errorElement: <Notfound></Notfound>,
      children: [
        { index: true, element:<ProtectedRoute allowedGroups={["SuperAdmin", "Admin","SystemUser"]}> <Home></Home> </ProtectedRoute>},
        { path: "recipes-list", element:<ProtectedRoute allowedGroups={["SuperAdmin", "Admin","SystemUser"]}> <RecipesList></RecipesList> </ProtectedRoute>},
        { path: "recipe-data", element:<ProtectedRoute allowedGroups={["SuperAdmin", "Admin"]}> <RecipesData></RecipesData> </ProtectedRoute>},
        { path: "recipe/:id", element:<ProtectedRoute allowedGroups={["SuperAdmin", "Admin"]}> <RecipesData></RecipesData> </ProtectedRoute>},
        { path: "categories-list", element:<ProtectedRoute allowedGroups={["SuperAdmin", "Admin"]}> <CategoriesList></CategoriesList> </ProtectedRoute>},
        { path: "users-list", element:<ProtectedRoute allowedGroups={["SuperAdmin", "Admin"]}> <UsersList></UsersList> </ProtectedRoute>},
        { path: "favorites", element:<ProtectedRoute allowedGroups={["SystemUser"]}> <Favorites></Favorites> </ProtectedRoute>},
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
