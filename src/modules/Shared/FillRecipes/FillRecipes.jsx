import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FillRecipes({buttonContent ,action}) {
  const navigate =useNavigate();
    return (
    <div className="d-flex flex-column flex-md-row fillrecipes rounded-4 my-3 justify-content-between align-items-center">
      <div className="rightPart w-100 w-md-50 mb-2 pe-md-5">
        <h5 className="h4">
          {action} the
          <span>Recipes</span>!
        </h5>
        <p>
          you can now fill the meals easily using the table and form , click
          here and sill it with the table !
        </p>
      </div>
      <button className="btn p-2 px-5 auth-btn btnn" 
      onClick={()=>{navigate("/home/recipes-list")}}
            >
        {buttonContent}
        <i className="fa-solid fa-arrow-right ms-3"></i>
      </button>
    </div>
  );
}
