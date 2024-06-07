import { Box, Typography } from "@mui/material";
import "../Home.css";
import Goal from "../../../Assets/HomeImages/Goal.png";
import Focused from "../../../Assets/HomeImages/Focused.png";
import MentalHealth from "../../../Assets/HomeImages/MentalHealth.png";
import Health from "../../../Assets/HomeImages/Health.png";
import HeaderIcon from "../../../Assets/HomeImages/headeIcon.png";

function Header() {
  return (
    <>
      <Box
        variant="outlined"
        backgroundColor={"#894D21"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Typography
          variant="h5"
          p={1}
          // textAlign="center"
          color={"#F3EAE4"}
          fontSize={"2.5rem"}
          // fontFamily={"poppins !important"}
          fontWeight='800'
          className="header_heading"
        >
          Habit 1<img className="vector-image" src={HeaderIcon} alt="#" />x
        </Typography>
        <hr className="header-info" />
        <Typography
          variant="h5"
          padding={"14px"}
          fontWeight={"500"}
          color={"#F3EAE4"}
          fontSize={"1rem"}
          fontFamily={"poppins !important"}
          className="header_heading_right"
        >
          Build Habits
          <br />
          That Matter
        </Typography>
      </Box>
      <Box
        margin={"1.5rem"}
        display={"flex"}
        justifyContent={"center"}
        gap={"0.5rem"}
      >
        <Box>
          <Typography
            variant="h2"
            fontWeight={"600"}
            color={"#894D21"}
            className={"header-content"}
            fontFamily={"poppins !important"}
          >
            10x
          </Typography>
        </Box>
        <Box className="header-container">
          <Typography
            variant="h5"
            fontWeight={"500"}
            color={"#894D21"}
            fontFamily={"poppins !important"}
            className={"header-information"}
          >
            Transformation Through
          </Typography>
          <Typography
            variant="h5"
            fontWeight={"700"}
            color={"#894D21"}
            fontSize={"2.2rem"}
            lineHeight={"1.6rem"}
            fontFamily={"poppins !important"}
            className={"header-information power_routine_text"}
          >
            Power of Routine
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box display={"flex"} justifyContent={"center"} gap={"0.5rem"}>
          <Box className="fix-card-align">
            <img className="image-card" src={Goal} alt="img not found" />
            <Typography className="text-align">
              Achieve your <br />
              Potential
            </Typography>
          </Box>
          <Box className="fix-card-align">
            <img className="image-card" src={Focused} alt="img not found" />
            <Typography className="text-align">
              More Focused <br />& Creative
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={"0.5rem"}
          marginTop={"0.5rem"}
          marginBottom={"4rem"}
        >
          <Box className="fix-card-align">
            <img
              className="image-card"
              src={MentalHealth}
              alt="img not found"
            />
            <Typography className="text-align">
              Better Mental <br />
              Health
            </Typography>
          </Box>
          <Box className="fix-card-align">
            <img className="image-card" src={Health} alt="img not found" />
            <Typography className="text-align">
              Improved Health <br />
              Conditions
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Header;
