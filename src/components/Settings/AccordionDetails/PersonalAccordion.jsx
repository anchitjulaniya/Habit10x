import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Snackbar,
  AccordionDetails,
} from "@mui/material";
import axios from "axios";
import '../Setting.css'
import { url } from "../../../constant";
import AlertBox from "../../AlertBox/Alert";
import Loader from "../../Loader/Loader";
const PersonalAccordion = ({data}) => {
  const [updatedData, setUpdatedData] = useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      // To Update the user information
      setIsLoading(true);
      const { mail } = JSON.parse(sessionStorage.getItem("data"));
      const response = await axios.patch(
        `${url}/zohouser?mail=${mail}`,
        updatedData
      );
      // fetchData();                        
      setOpenSnackbar(true);
      setMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      setMessage(error?.message);
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };
 
  const handleFieldChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleClosed = () => {
    setOpenSnackbar(false);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
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
      {isLoading &&
        <Loader />
      }
      <AccordionDetails className="AccordionDetails">
        <Typography>
          <Box>
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label">Name</Typography>
                <TextField
                disabled
                  fullWidth
                  type="text"
                  placeholder="Name"
                  className="ml-2"
                  value={updatedData.name || data?.name}
                  onChange={(e) =>
                    handleFieldChange("name", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label">Phone</Typography>
                <TextField
                  fullWidth
                  disabled
                  type="number"
                  placeholder="Contact Number"
                  className="ml-2"
                  value={updatedData.mobile || data?.mobile}
                  onChange={(e) =>
                    handleFieldChange("mobile", e.target.value)
                  }
                />
              </div>

            </div>
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label">Email</Typography>
                <TextField
                  fullWidth
                  type="email"
                  disabled
                  placeholder="Email"
                  className="ml-2"
                  value={updatedData.mail || data?.mail}
                  onChange={(e) =>
                    handleFieldChange("mail", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label">Location</Typography>
                <TextField
                  fullWidth
                  type="text"
                  disabled
                  placeholder="Location"
                  className="ml-2"
                  value={updatedData.country || data?.country}
                  onChange={(e) =>
                    handleFieldChange("country", e.target.value)
                  }
                />
              </div>

            </div>
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label"> Time Zone</Typography>
                <TextField
                  fullWidth
                  type="text"
                  disabled
                  placeholder="Time-Zone"
                  className="ml-2"
                  value={updatedData.timezone || data?.timezone}
                  onChange={(e) =>
                    handleFieldChange("timezone", e.target.value)
                  }
                />
              </div>

            </div>
            {/* code will use in next Phase  */}

            {/* <Button
              fullWidth
              className="update_btn"
              onClick={handleUpdate}
            >
              Save
            </Button> */}
          </Box>
        </Typography>
      </AccordionDetails>
    </>
  )

}
export default PersonalAccordion;