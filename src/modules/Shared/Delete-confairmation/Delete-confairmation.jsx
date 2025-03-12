import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import notImg from '../../../assets/Group 48102290.jpg';


function DeleteConfermation({show,handleClose,deletionFunction}) {
  


  return (
    <>
 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
   
        </Modal.Header>
        <div className="delete-content notImg w-50">
          <div>

               <img src={notImg} className='w-100' />
          </div>
               <h2 className='h6 my-3 fw-semibold'>No Data !</h2>
               <p className='text-break'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
               <button className='btn btn-outline-danger' onClick={deletionFunction}>Delete this item </button>
             </div>
       
      </Modal>
    </>
  );
}

export default DeleteConfermation;


        