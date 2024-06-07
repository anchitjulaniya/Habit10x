import { Alert } from "@mui/material";
import react, { forwardRef } from "react";

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default AlertBox;
