import {
  Box,
  Card,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";
import "./Resource.css";
import BottomNavBar from "../NavBar/BottomNavBar";
import { useNavigate } from "react-router-dom";
import Pdf from "./Common/Pdf";
import Video from "./Common/video";
import Faq from "./Common/Faq";

const Resource = () => {
  const [section, setSection] = useState("pdf");
  const navigate = useNavigate();
  const handleSectionChange = (event, newSection) => {
    setSection(newSection);
  };

  const handleLogout = async () => {
    try {
      sessionStorage.clear();
      navigate("/");
    } catch (error) { }
  };
  // To protected the Route
  // const mail = JSON.parse(sessionStorage.getItem("data"));
  // if (!mail){
  //   navigate('/');
  //   return
  // }
  return (
    <>
      <Box>
        <Grid className="video" container sx={{ backgroundColor: "#f2eaf4" }}>
          <Grid item md={4} xs={0}></Grid>
          <Grid item md={4} xs={12}>
            <Card
              className="main"
              sx={{
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card>
                <Box
                  backgroundColor={"#894D21"}
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems="center"
                  padding={2}
                >
                  <Typography className="resource_heading"
                    variant="h5"
                    style={{
                      flex: 1,
                    }}
                  >
                    Resources
                  </Typography>
                  <Box>
                    <LogoutIcon
                      style={{ color: "#fff" }}
                      fontSize="small"
                      onClick={handleLogout}
                    />
                  </Box>
                </Box>
              </Card>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ToggleButtonGroup
                  className="toggle_btn_grp"
                  value={section}
                  exclusive
                  onChange={handleSectionChange}
                  sx={{ my: 2 }}
                >
                  <ToggleButton value="pdf" className="toggle_btn ">
                    Pdf
                  </ToggleButton>
                  <ToggleButton value="video" className="toggle_btn ">
                    Video
                  </ToggleButton>
                  <ToggleButton value="faqs" className="toggle_btn ">
                    FAQs
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Pdf section={section} />
              <Video section={section} />
              <Faq section={section} />


              <Box style={{ marginBottom: "4rem" }}>
                <BottomNavBar />
              </Box>
            </Card>
          </Grid>
          <Grid item md={4} xs={0}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Resource;