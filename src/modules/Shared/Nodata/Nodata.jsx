import React from 'react'
import notImg from '../../../assets/Group 48102290.jpg'

export default function Nodata() {
  return (
    <div className='w-100 nodata '>
      <div className="notImg w-50">
        <img src={notImg}/>
        <h2 className='h6 my-3 fw-semibold'>No Data !</h2>
        <p className='text-break'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
      </div>
      
    </div>
  )
}
