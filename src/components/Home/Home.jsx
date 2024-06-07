import { Box, Card, Grid } from "@mui/material";
import "./Home.css";
import "../../common.css";
import Header from "./Pages/Header";
import Login from "./Pages/Login";
import Footer from "./Pages/Footer";
// import Notification from "./Notification";
import React from "react";

function Home() {
  return (
    <>
        {/* <Notification/> */}
        <Box>
        <Grid container>
          <Grid item md={4} xs={0}></Grid>
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                backgroundColor: "#E6D4C7",
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Header />
                <Login />
                <Footer />
              </Box>
            </Card>
          </Grid>
          <Grid item md={4} xs={0}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;