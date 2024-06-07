import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Switch,
  Stack,
  MenuItem,
  Button,
  Snackbar,
  AccordionDetails,
  Select,
  InputLabel,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import axios from "axios";
import { url } from "../../../constant";
import AlertBox from "../../AlertBox/Alert";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
const PreferencesAccordion = ({ data, callBack, dataProgram }) => {
  const navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({});
  const [programData, setProgramData] = useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const handleFieldChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRenew = () => {
    navigate('/checkOut');
  }

  const handleUpdate = async (e) => {
    if (e?.target.value?.toLowerCase() !== data?.wakeupcallopted) {
      try {
        // To Update the user information
        setIsLoading(true);
        const { mail } = JSON.parse(sessionStorage.getItem("data"));
        const programId = selectedProgram;
        const response = await axios.patch(
          `${url}/zohouser?mail=${mail}`, { wakeupcallopted: e.target.value }
        );
        setOpenSnackbar(true);
        callBack();
        setMessage(response.data.message);
        setIsLoading(false);
      } catch (error) {
        setMessage(error?.message);
        setOpenSnackbar(true);
        setIsLoading(false);
      }
    }
  };
  const fetchData = async () => {
    try {
      // To Get the user information
      const { mail } = JSON.parse(sessionStorage.getItem("data"));

      // API call to get the programs 
      setProgramData(dataProgram.data);
      setSelectedProgram(data.pid);
    } catch (error) { }
  };


  const handleClosed = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchData();
  }, [])

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
                <Typography className="label"> Program</Typography>
                <FormControl fullWidth
                  className="ml-2"
                >
                  <Select
                    disabled
                    value={selectedProgram}
                    onChange={(e) => { setSelectedProgram(e.target.value); handleFieldChange("programname", e.target.value) }}
                  >
                    {programData?.programdata?.map((program) => (
                      <MenuItem key={program.programid} value={program.programid}>
                        {program.pname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

            </div>
            {/* <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label"> Subscription</Typography>
                {data?.subscriptionstatus === "True" ?
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Subscription"
                    className="ml-2 subscription_active"
                    disabled
                    value={"Active"}
                  />
                  :
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Subscription"
                    className="ml-2 subscription_inactive"
                    disabled
                    value={
                      "Inactive"}
                  />
                }
              </div>

            </div> */}
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label"> Club</Typography>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Club"
                  className="ml-2"
                  value={updatedData.club || data?.club}
                  onChange={(e) =>
                    handleFieldChange("club", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label"> Start Date</Typography>
                <TextField style={{ cursor: "not-allowed" }}
                  fullWidth
                  type="text"
                  placeholder="Start Date"
                  className="ml-2"
                  disabled
                  value={data?.startdate}
                  onChange={(e) =>
                    handleFieldChange("startdate", e.target.value)
                  }
                />
              </div>

            </div>
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label"> End Date</Typography>

                <TextField
                  fullWidth
                  type="text"
                  placeholder="End Date"
                  className="ml-2"
                  disabled
                  value={updatedData.enddate || data?.enddate}
                  onChange={(e) =>
                    handleFieldChange("enddate", e.target.value)
                  }
                />
              </div>

            </div>
            <div className="dropdown" >
              <div className="PersonalInformationDiv">
                <Typography className="label">Wakeup Call</Typography>
                <ToggleButtonGroup
                  value={data.wakeupcallopted}
                  exclusive
                  className="toggle-button"
                  fullWidth
                  onChange={handleUpdate}
                  aria-label="Toggle button group"
                >
                  <ToggleButton value="true" aria-label="Yes" >
                    Yes
                  </ToggleButton>
                  <ToggleButton value="false" aria-label="No">
                    No
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>

            {/* Code will use in future if needed  */}

            {/* <Button
              fullWidth
              className="update_btn"
              onClick={handleUpdate}
            >
              Save
            </Button> */}
            <Button
              fullWidth
              className="update_btn"
              onClick={handleRenew}
            >
              Renew Now
            </Button>
            <h5 style={{ color: "#894D21", textAlign: "center" }}>
              Continue your habit building journey...
            </h5>
          </Box>{" "}
        </Typography>
      </AccordionDetails>
    </>
  )

}
export default PreferencesAccordion;