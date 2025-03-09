import React from "react";

import notImg from '../../../assets/Group 48102290.jpg'

export default function DeleteConfairmation({ show, setShow }) {
  return (
    <div
      className={` delete-conf position-absolute d-flex justify-content-center align-items-center top-0 left-0  ${
        show ? "d-block" : "d-none"
      }`}
      onClick={() => {
        setShow(false);
      }}
    >
      <div
        className={` position-relative  bg-white rounded-5 text-center p-3 mt-5`}
        onClick={(e) => e.stopPropagation()}
      >
        <i
          className="fa fa-close position-absolute "
          onClick={() => {
            setShow(false);
          }}
        ></i>

         <div className="notImg w-50">
               <img src={notImg}/>
               <h2 className='h6 my-3 fw-semibold'>No Data !</h2>
               <p className='text-break'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
             </div>
      </div>
    </div>
  );
}
