import React from 'react'

export default function FillRecipes() {
  return (
    <div className='d-flex fillrecipes rounded-4 my-3 justify-content-between align-items-center'>
<div className="rightPart">
  <h5 className='h4'>
  Fill the  
    <span>
    Recipes
    </span>
    !
  </h5>
  <p>
  you can now fill the meals easily using the table and form , click here and sill it with the table !
  </p>
</div>
<button className='btn p-2 px-5'>Fill Recipes 
  <i className="fa-solid fa-arrow-right ms-3"></i>
  </button>
    </div>
  )
}
