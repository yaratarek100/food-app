import React from "react";
import { Link } from "react-router-dom";

export default function FillRecipes({ Item, setShow }) {


  return (
    <>
      <div className="d-flex small-header py-1 justify-content-between align-items-center my-3">
        <div className="rightPart px-3 ">
          <h5 className="h5 m-0">{Item} Table Details</h5>
          <p className="m-0">You can check all details </p>
        </div>
        {Item == "recipe" ? (
          <Link to={"/dashboard/recipe-data"}>
            <button className="btn"> Add New {Item}</button>
          </Link>
        ) : (
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
