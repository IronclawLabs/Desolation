"use client";
import { toast, Zoom } from "react-toastify";

export const info = (message: any, delay = 5000) => {
  toast.info(message, {
    position: "top-center",
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
};

export const success = (message: any, delay = 5000) => {
  toast.success(message, {
    position: "top-center",
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
};

export const warning = (message: any, delay = 5000) => {
  toast.warning(message, {
    position: "top-center",
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
};

export const errorNotify = (message: any, delay = 5000) => {
  toast.error(message, {
    position: "top-center",
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const loading = (message = "Work in progress...") => {
  let temp = toast.loading(message, {
    position: "top-center",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });

  return temp;
};

export const status = (
  toastId: any,
  message: any,
  status: number,
  delay = 5000
) => {
  const statusText = status.toString();
  if (statusText.startsWith("2")) {
    toast.update(toastId, {
      position: "top-center",
      autoClose: delay,
      isLoading: false,
      render: message,
      type: "success",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  } else if (statusText.startsWith("3")) {
    toast.update(toastId, {
      position: "top-center",
      autoClose: delay,
      isLoading: false,
      render: message,
      type: "warning",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  } else if (statusText.startsWith("1")) {
    toast.update(toastId, {
      position: "top-center",
      autoClose: delay,
      isLoading: false,
      render: message,
      type: "info",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  } else if (statusText.startsWith("4") || statusText.startsWith("5")) {
    toast.update(toastId, {
      position: "top-center",
      autoClose: delay,
      isLoading: false,
      render: message,
      type: "error",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }
};

export const resNotify = (res:any,delay = 5000) =>{
  console.log(res);
  
  if(res.status.toString().startsWith("2")){    
    success(res.message,delay)
  }else if ( res.status.toString().startsWith("4")){
    errorNotify(res.message,delay)
  }

}
