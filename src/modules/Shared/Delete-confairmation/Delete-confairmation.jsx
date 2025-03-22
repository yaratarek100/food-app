import Modal from "react-bootstrap/Modal";
import notImg from "../../../assets/Group 48102290.jpg";

function DeleteConfirmation({
  item,
  show,
  isDeleting,
  handleClose,
  deletionFunction,
}) {

  return (
    <>
      <Modal show={show} onHide={handleClose} className="delete">
        <Modal.Header closeButton></Modal.Header>
        <div className="delete-content notImg w-50 ">
          <div>
            <img src={notImg} className="w-100" />
          </div>
          <h2 className="h6 my-3 fw-semibold">Delete This {item} ?</h2>
          <p className="text-break">
            are you sure you want to delete this {item} ? if you are sure just
            click on delete it
          </p>
        </div>
        <button
          className="btn btn-outline-danger mb-4 me-4 ms-auto p-2 px-4"
          onClick={deletionFunction}
        >
          {isDeleting ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Delete"
          )}
        </button>
      </Modal>
    </>
  );
}

export default DeleteConfirmation;
