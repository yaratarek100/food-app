import React from 'react'

export default function FillRecipes({Item}) {
  return (
    <div className='d-flex small-header py-1 justify-content-between align-items-center my-3'>
<div className="rightPart px-3 ">
  <h5 className='h5 m-0'>
  Recipe Table Details
  </h5>
  <p className='m-0'>
  You can check all details  </p>
</div>
<button className='btn'>Add New {Item}</button>
    </div>
  )
}
