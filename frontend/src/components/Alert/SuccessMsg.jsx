import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from "sweetalert2"
import { resetSuccessAction } from '../../redux/slices/globalSlice/globalSlices';
const SuccessMsg = ({message}) => {
  const dispatch = useDispatch();
  Swal.fire({icon:"success", title:"Success!" , text:message})
  dispatch(resetSuccessAction())
}

export default SuccessMsg



// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import { resetSuccessAction } from "../../redux/slices/globalSlice/globalSlices";

// const SuccessMsg = ({ message }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("SUCCESSMSG EFFECT RUNNING");
//     Swal.fire({
//       icon: "success",
//       title: "Success!",
//       text: message,
//     });

//     dispatch(resetSuccessAction());
//   }, [dispatch, message]);

//   return null;
// };

// export default SuccessMsg;