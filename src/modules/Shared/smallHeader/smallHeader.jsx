import React from "react";
import { Link ,useNavigate} from "react-router-dom";

export default function FillRecipes({ Item, setShow ,userRole}) {
  const navigate =useNavigate();
  return (
    <>
      <div className="d-flex small-header py-1 justify-content-between align-items-center my-3">
        <div className="rightPart px-3 ">
          <h5 className="h5 m-0">{Item} Table Details</h5>
          <p className="m-0">You can check all details </p>
        </div>

        {/* show adding button */}
        {userRole == "SystemUser" ? null : Item == "recipe" ? (
          //for adding new recipe
            <button className="btn auth-btn btnn"      onClick={()=>{navigate("/home/recipe-data")}}> Add New {Item}</button>
        
        ) : (
          //for adding new category
          <button
            className="btn"
            onClick={() => {
              setShow(true);
            }}
          >
            Add New {Item}
          </button>
        )}
      </div>
    </>
  );
}
