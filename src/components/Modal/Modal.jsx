import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
function ModalPopUp({ openModal, setOpenModal }) {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/checkOut");
  };
  return (
    <Modal open={openModal} closeAfterTransition>
      <Fade in={openModal}>
        <Box className="modal-container">
          <Box className="modal-content">
            <IconButton
              aria-label="close"
              onClick={() => setOpenModal(false)}
              style={{
                bottom: "10px",
                left: "95%",
                width: "20px",
                height: "20px"
              }}
            >
              <CloseIcon fontSize="4px" />
            </IconButton>
            <Box className="model_container">
              <ErrorIcon fontSize="4rem" sx={{color:"#894d21", fontSize:"70px"}} className="icon" />
              <Typography className="heading1">Your Subscription Has Expired</Typography>
              <Typography className="heading2">To continue your habit building journey</Typography>
              <Button className="renew_btn" onClick={handleJoin}>Renew Now</Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalPopUp;
