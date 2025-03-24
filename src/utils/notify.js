
import { Flip, toast } from "react-toastify";

export const notify = (message, type  ) => {

 let customClass="toastCustomClass";

    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
      className: customClass,
    });
  }