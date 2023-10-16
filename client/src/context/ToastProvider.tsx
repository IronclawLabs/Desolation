"use client";
import {ToastContainer} from "react-toastify"



const ToastContextProvider = ({ children }:any) => {

    
    return (
      <>
      
      { children }
      <ToastContainer/>
      </>
                
    );
  };
  export default ToastContextProvider;