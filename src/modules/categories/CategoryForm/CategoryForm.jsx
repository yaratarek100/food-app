import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CATEGORIES_URLS, privateAxiosInstance } from "../../../services/urls";
import { notify } from "../../../utils/notify";

export default function CategoryForm({
  show,
  addCategory,
  itemData,
  editCategory,
  handleClose
})
 {


  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { name: "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (show) {
      reset({ name: itemData || "" });
    }
  }, [itemData, show, reset]);

  const onSubmit = async (data) => {
    
    itemData ? editCategory(data) : addCategory(data);
  };

  return (
    <div className="category-form">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{itemData ? "Edit" : "Add" } Category</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
          <input
            type="text"
            className="d-block mx-auto"
            placeholder="category name"
            {...register("name", { required: "category name is required" })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
          <Modal.Footer>
            <Button className="btn" type="submit">
              {isSubmitting ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "save"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
