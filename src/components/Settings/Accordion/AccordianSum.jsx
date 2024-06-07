import { Typography } from "@mui/material";
import React from "react";
import '../Setting.css'
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
const AccordianSummary = ({ Preferences }) => {
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));
  return (
    <AccordionSummary
      className="info-Data2"
      aria-controls="panel2d-content"
      id="panel2d-header"
    >
      <Typography className="personalInfo">
        {Preferences}
      </Typography>
    </AccordionSummary>
  )

}
export default AccordianSummary;