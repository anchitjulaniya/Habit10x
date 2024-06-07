import React, { useEffect, useState } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import {
  Box,
  Card,
  Grid,
  Typography,
  TextareaAutosize,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "./Setting.css";
import BottomNavBar from "../NavBar/BottomNavBar";
import AccordianSummary from "./Accordion/AccordianSum";
import PersonalAccordion from "./AccordionDetails/PersonalAccordion";
import PreferencesAccordion from "./AccordionDetails/PreferencesAccordion";
import axios from "axios";
import { url } from "../../constant";

const Setting = () => {
  const [expanded, setExpanded] = useState("");
  const navigate = useNavigate();
  const [dataProgram, setDataProgram] = useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [data, setData] = useState({});
  const [preferencesText, setpPreferencesText] = useState("")
  const fetchData = async () => {
    try {
      // To Get the user information
      const { mail } = JSON.parse(sessionStorage.getItem("data"));
      const response = await axios.get(`${url}/getzohouser/${mail}`);
      setData(response.data);
    } catch (error) { }
    const response1 = await axios.get(`${url}/allprograms`);
    setDataProgram(response1)


  };
  useEffect(() => {
    fetchData();
  }, [])

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
      borderRadius: 30,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleLogout = async () => {
    try {
      sessionStorage.clear();
      navigate("/");
    } catch (error) { }
  };
  //  for whatsapp handle 
  const handleClickWhatsAppIcon = () => {
    const whatsappLink = 'https://api.whatsapp.com/send?phone=8641023581';
    window.open(whatsappLink, "_blank");
  }
  // for mail handle 
  const handleEmailIconClick = () => {
    const subject = "SendMail";
    const body = "Description";
    const mailtoHref = `mailto:support@habit10x.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoHref;
  };


  return (
    <>

      <Box className="">
        <Grid className="settings" container>
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
                  <Typography className="setting_heading"
                    variant="h5"
                    style={{
                      flex: 1,
                    }}
                  >
                    Settings
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
              <Box className="info-Data">
                <Accordion
                  className="accordion"
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordianSummary Preferences={"Personal Details"} />
                  <PersonalAccordion data={data} />
                </Accordion>
                <Accordion
                  className="accordion"
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordianSummary Preferences={"Program Preferences"} />
                  <PreferencesAccordion dataProgram={dataProgram} data={data} callBack={fetchData} />

                </Accordion>
                <Accordion
                  style={{ borderRadius: "30px", border: "0px solid #fff" }}
                  className="accordion"
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordianSummary Preferences={"Need Support?"} />
                  <AccordionDetails className="AccordionDetails">
                    <Typography className="complainText">
                      If you have any complain
                      <MailIcon onClick={handleEmailIconClick} className="MailIcon" fontSize="30px" />
                      <WhatsAppIcon onClick={handleClickWhatsAppIcon} fontSize="30px" className="WhatsAppIcon" />
                    </Typography>
                    <Box>
                      <TextareaAutosize
                        className="TextareaAutosize"
                        placeholder="or write us here..."
                        // onChange={(e) => setDescription(e.target.value)}
                        // value={description}
                        minRows={4}
                        label="Outlined"
                        cols={70}
                        required={true}
                      // validate={composeValidators(isRequired)}
                      />
                    </Box>
                    <Button className="need_support_submit_btn">Submit</Button>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box>
                <BottomNavBar />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Setting;