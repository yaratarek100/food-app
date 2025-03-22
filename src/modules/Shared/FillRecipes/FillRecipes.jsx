import React from "react";
import { Link } from "react-router-dom";

export default function FillRecipes({buttonContent ,action}) {
  return (
    <div className="d-flex fillrecipes rounded-4 my-3 justify-content-between align-items-center">
      <div className="rightPart">
        <h5 className="h4">
          {action} the
          <span>Recipes</span>!
        </h5>
        <p>
          you can now fill the meals easily using the table and form , click
          here and sill it with the table !
        </p>
      </div>
        <Link to={"/home/recipes-list"}>
      <button className="btn p-2 px-5">
        {buttonContent}
        <i className="fa-solid fa-arrow-right ms-3"></i>
      </button>
        </Link>
    </div>
  );
}
