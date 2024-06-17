import { Link, Snackbar, TextField } from "@mui/material";
import "../Home.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ForgotPassword from "../ForgotPassword";
import axios from "axios";
import AlertBox from "../../AlertBox/Alert";
import { url } from "../../../constant";
import { useRef } from "react";
function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const forgotPasswordRef = useRef();
  const handleClosed = () => {
    setOpenSnackbar(false);
  };
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const isEmailValid = (email) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
  };

  const handleLoginClick = async () => {
    if (!isEmailValid(userName)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (password === "") {
      setPasswordError("Required");

      return;
    } else {
      setPasswordError("");
    }
    const data = {
      password,
      userName,
    };
    try {
      const response = await axios.post(`${url}/login/${userName}`, data);
      if (response.status === 200) {
        navigate("/dashboard");
        sessionStorage.setItem("data", JSON.stringify(response?.data));
      }
    } catch (error) {
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
    }
  };

  const handleRegisterNow = () => {
    window.open("https://habit10x.com/subscription-morning-routine-program/", "_blank");
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
          severity={"error"}
          onClose={handleClosed}
          sx={{ width: "100%" }}
        >
          {message}
        </AlertBox>
      </Snackbar>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ForgotPassword closeModal={handleClose} ref={forgotPasswordRef} />
        </Modal>
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          margin: "-1rem 2rem 0rem 2rem",
        }}
      >
        <TextField
          fullWidth
          className="input_email"
          placeholder="Enter email"
          value={userName}
          onChange={(e) => {
            const email = e.target.value;
            setUserName(email);
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
        <Box className="validation" width={"100%"}>
          {emailError && (
            <p style={{ color: "red", fontSize: "13px", paddingBottom: "5px" }}>
              {emailError}
            </p>
          )}
        </Box>
        <TextField
          fullWidth
          className="input_pass"
          placeholder=" Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: "10px",
            bordeRadius: "10px",
            border: "none",
          }}
        />
        <Box className="validationPass" width={"100%"}>
          {passwordError && (
            <p
              style={{
                color: "red",
                fontSize: "13px",
              }}
            >
              {passwordError}
            </p>
          )}
        </Box>
        <Typography
          className="forget_pass"
          variant="h10"
          fontWeight="500"
          padding="0 0.5rem"
          fontFamily="Poppins"
          color="#894D21"
        >
          <Link className="forgotPassword" onClick={handleOpen}>
            Forgot Password
          </Link>
        </Typography>
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          // onClick={handleLoginClick}
          onClick={()=>{
            console.log("before navigate")
            navigate("/dashboard")
            console.log("after navigate")
          }
            
          }
          style={{
            backgroundColor: "#894D21",
            color: "white",
            width: "45%",
            height: "45px",
            borderRadius: "10px",
          }}
        >
          LOGIN{" "}
        </Button>
        <Typography
          className="daysFreeTrailText"
          style={{
            fontSize: "1.25rem",
            color: "#894D21",
            marginTop: "2rem",
            width: "100%",
          }}
        >
          *For 7 Days Free Trial
          <Button
            className="register_now_btn"
            onClick={() => handleRegisterNow()}
          >
            Register Now
          </Button>
        </Typography>
      </Box>
    </>
  );
}
export default Login;
