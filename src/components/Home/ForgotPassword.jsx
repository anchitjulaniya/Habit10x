  import { Box, Button, IconButton, Snackbar, TextField } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import React from "react";
  import "./Forgot.css";
  import axios from "axios";
  import AlertBox from "../AlertBox/Alert";
  import { url } from "../../constant";


  const ForgotPassword = React.forwardRef(({ closeModal }, ref) => {
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const style = {
      position: "absolute",
      top: "50%",
      left: "49%",
      transform: "translate(-50%, -50%)",
      width: 320,
      bgcolor: "#F3EAE4",
      boxShadow: 24,
      lineHeight: 5,
      p: 3.6,
    };

    const isEmailValid = (email) => {
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regexEmail.test(email);
    };

    const handleClosed = () => {
      setOpenSnackbar(false);
    };

    const handleForgot = async () => {
      if (!isEmailValid(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }

      const data = {
        mail: email,
      };

      try {
        const response = await axios.patch(`${url}/zohouser?mail=${data?.mail}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMessage(response?.data?.message);
        setOpenSnackbar(true);
        closeModal(true);
      } catch (error) {
        setMessage(error?.response?.data?.message);
        setOpenSnackbar(true);
      }
    };

    return (
      <>
        <Snackbar
          className="Snackbar"
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleClosed}
        >
          <AlertBox
            autoHideDuration={1000}
            severity={
              message === "Userdata Successfully Updated!!!" ? "success" : "error"
            }
            onClose={handleClosed}
            sx={{ width: "100%" }}
          >
            {message}
          </AlertBox>
        </Snackbar>
        <Box  ref={ref}
          sx={style}
          tabIndex="-1"
          >
          <IconButton
            aria-label="close"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "20px",
              height: "20px",
            }}
          >
            <CloseIcon fontSize="4px" />
          </IconButton>
          <TextField
            className="input_email"
            fullWidth
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              const email = e.target.value;
              setEmail(email);
              if (!isEmailValid(email)) {
                setEmailError("Please enter a valid email address");
              } else {
                setEmailError("");
              }
            }}
            style={{
              marginBottom: "10px",
              borderRadius: "10px",
              border: "none",
            }}
          />
          {emailError && (
            <p
              style={{
                color: "red",
                lineHeight: "1px",
                margin: "0px",
                fontSize: "13px",
              }}
            >
              {emailError}
            </p>
          )}
          <Button onClick={handleForgot} fullWidth className="update_btn">
            Forgot Password
          </Button>
        </Box>
      </>
    );
  });

  export default ForgotPassword;