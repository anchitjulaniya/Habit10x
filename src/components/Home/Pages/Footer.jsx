import { Box, Button, Card, Typography } from "@mui/material";
import "../Home.css";
import ProgramImage from "../../../Assets/HomeImages/ourProgram2.png";
import MorningRoutine from "../../../Assets/Morning Routine Master Program.png";
import ReviewImage from "../../../Assets/HomeImages/ReviewImage.png";
import ReviewImage1 from "../../../Assets/HomeImages/ReviewImage1.png";
import ClipPathGrp1 from "../../../Assets/Clip path group (1).png";
import ClipPathGrp2 from "../../../Assets/Clip path group (2).png";
import BrochurePdf from "../../../Assets/Brochure New.pdf";

function Footer() {
  const handleDownloadBrochure = () => {
    
    const link = document.createElement("a");
    link.download = "Brochure-PDF-File";
    link.href = BrochurePdf;
    link.click();

  };
  return (
    <>
      <Box
        className="program-image-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button
          className="our_program_button"
          style={{
            backgroundColor: "#894D21",
            color: "#fff",
            padding: "0.5rem 4rem",
            position: "relative",
            top: "1.25rem",
          }}
        >
          Our Program
        </Button>
        <img className="program-image" src={ProgramImage} alt="img not found" />
      </Box>

      <Box className="broucher_main_box" marginTop={"4rem"}>
        <Box width={"50%"}>
          <img
            className="image-content"
            src={MorningRoutine}
            alt="img not found"
          />
        </Box>
        <Box width={"50%"}>
          <Typography className="text-content">
            Build a Powerful
            <br />
            Life Changing <br /> Moring Routine
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          className="download_brochure_btn"
          style={{
            backgroundColor: "#894D21",
            color: "#fff",
            padding: "0.5rem 4rem",
            position: "relative",
            top: "3rem",
            margin: "4rem 0rem",
          }}
          onClick={handleDownloadBrochure}
        >
          Download Brochure
        </Button>
      </Box>

      <Box className="quote-container">
        <Typography className="quote-content">
          " 5am Morning Club Is The Secret <br /> Door To Your Success "
        </Typography>
      </Box>

      <Box
        className="broucher_main_box2"
        marginTop={"4rem"}
        marginBottom={"4rem"}
      >
        <Box>
          <img
            className="image-content2"
            src={ClipPathGrp1}
            alt="img not found"
          />
        </Box>
        <Typography className="text-content2">
          Habit10x team has also contributed to this domain with our books
          <b> “Habit Building Frameworks”</b> & <b>“The Habit Code”.</b>
        </Typography>
        <Box>
          <img
            className="image-content2"
            src={ClipPathGrp2}
            alt="img not found"
          />
        </Box>
      </Box>

      {/* Review Section  */}
      <Box>
        <Box
          className="background_color "
          sx={{
            p: "1rem",
            m: "0.8rem",
            display: "flex",
            backgroundColor: "#E6D4C7",
          }}
        >
          <Box className="text-center">
            <img
              className="image-review"
              src={ReviewImage}
              alt="img not found"
            />
            <Typography className="review-content">
              During the Pandemic, uncertainty left a lasting impact on me. Even
              after things returned to normal,anxiety persisted due to a
              distrupted routine. Habit10x beocome the perfect companion,
              helping me regain stability and embrace a better Life.
              <br />
              <strong>Maya, Homemaker</strong>
            </Typography>
          </Box>
        </Box>
        <Box
          className="background_color "
          sx={{
            p: "1rem",
            m: "0.8rem",
            display: "flex",
            backgroundColor: "#E6D4C7",
          }}
        >
          <Box className="text-center">
            <img
              className="image-review"
              src={ReviewImage1}
              alt="img not found"
            />
            <Typography className="review-content">
              My final year at the university was super stressful the sessions
              at Habit10x helped me sort my life on multiple levels i might miss
              a night out, but i would never miss waking up early. <br />
              <strong>Emily, Student</strong>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Footer;
