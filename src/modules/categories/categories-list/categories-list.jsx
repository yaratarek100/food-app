import React, { useEffect, useState } from "react";
import { CATEGORIES_URLS, privateAxiosInstance} from "../../../services/urls";
import Nodata from "./../../Shared/Nodata/Nodata";
import Header from "./../../../modules/Shared/Header/Header";
import SmallHeader from "./../../Shared/smallHeader/smallHeader";
import DeleteConfairmation from "../../Shared/Delete-confairmation/Delete-confairmation";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  // const [deleteCard, setdeleteCard] = useState(false)

  let getCategoriesList = async (pageSize, pageNumber) => {
    try {
      let response = await privateAxiosInstance.get(
        CATEGORIES_URLS.CATEGORIES_LIST(pageSize, pageNumber)
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let processCategory = async (categoryId, operation) => {
    try {
      let response;
      switch (operation.toLowerCase()) {
        case "get":
          response = await privateAxiosInstance.get(
            CATEGORIES_URLS.CATEGORY(categoryId)
          );
          console.log(response.data);
          break;
        // case "put":
        //   response = await privateAxiosInstance.put(
        //     CATEGORIES_URLS.CATEGORY(categoryId),

        //   );
        //   break;
        case "delete":
          response = await privateAxiosInstance.delete(
            CATEGORIES_URLS.CATEGORY(categoryId)
          );
          getCategoriesList(10, 1);
          break;
        default:
          console.error("Invalid operation:", operation);
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesList(10, 1);
  }, []);


  return (

    <div className="list">
      <Header title={"Categories"} titleSpan={" Items"}></Header>
      <SmallHeader Item={"Category"}> </SmallHeader>
     

        {categoriesList.length === 0 ? (
          <>
           <table className="table categories-list">
           <thead>
             <tr>
               <th scope="col">Item Name</th>
               <th scope="col">Actions</th>
             </tr>
           </thead>
           </table>
          <Nodata></Nodata>
          </>
        ) : (
          <table className="table table-striped table-hover  categories-list">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {categoriesList.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="  rounded-1 position-relative">
                  <i
                    className="fa fa-bars "
                    onClick={() => {
                      setActiveCategory(
                        activeCategory === item.id ? null : item.id
                      );
                    }}
                  ></i>

                  <div
                    className={` start-0 ${
                      activeCategory === item.id ? "active-category" : ""
                    } `}
                  >
                    <button
                      className="btn  text-secondary  rounded-0 "
                      onClick={() => {
                        processCategory(item.id, "get");
                      }}
                    >
                      <i className="fa-regular fa-eye"></i> View
                    </button>
                    <button
                      className="btn text-secondary  rounded-0 "
                      onClick={() => {
                        processCategory(item.id, "put");
                      }}
                    >
                      <i className="fa fa-edit"> </i> Edit
                    </button>
                    <button
                      className="btn  text-secondary rounded-0 "
                      onClick={() => {
                        processCategory(item.id, "delete");
                        // setdeleteCard(true);
                      }}
                    >
                      <i className="fa-solid fa-trash "></i>Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
      </table>


        )}
   {/* <DeleteConfairmation show={true} ></DeleteConfairmation> 
   is not completed */}
    </div>
    

  );
}
