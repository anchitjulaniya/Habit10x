import {
  Box,
  Button,
  Card,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import CircleIcon from "@mui/icons-material/Circle";
import BottomNavBar from "../NavBar/BottomNavBar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../constant";
import ModalPopUp from "../Modal/Modal";
import Loader from "../Loader/Loader";
import AlertBox from "../AlertBox/Alert";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [getProgram, setGetProgram] = useState();
  const [program, setProgram] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackBar] = useState(false);
  const getId = useLocation().search;
  const searchParams = new URLSearchParams(getId);
  const isSuccess = searchParams.get("payment")


  // for the future use 

  // const generateRandomColor = (index) => {
  //   const greenIndices = [1, 6, 7, 10, 11, 12, 15, 16, 21, 26];
  //   return greenIndices.includes(index) ? "#4E9B2A" : "#AF0E0E";
  // };


  // this comment is done by Anchit 
  // onload it will call fetchData and if user is not loggedin then user will redirect to login page
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  //   fetchData();
  // }, []);

  const handleLogout = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleRenew = () => {
    navigate('/checkOut');
  };
  const handleClosed = () => {
    setSnackBar(false);
  };


  const fetchData = async () => {
    try {
      const { mail } = JSON.parse(sessionStorage.getItem("data"));
      const response = await axios.get(`${url}/getzohouser/${mail}`);
      if (response.data.subscriptionstatus.toLowerCase() === "False".toLowerCase()) {
        setOpenModal(true);
      } else if (response.data.subscriptionstatus.toLowerCase() === "True".toLowerCase()) {
        setOpenModal(false);
      }
      setData(response.data);
    } catch (error) { navigate("/"); }
  };

  // To protected the Route
  // const mail = JSON.parse(sessionStorage.getItem("data"));
  // if (!mail) {
  //   navigate("/");
  //   return;
  // }
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  const formattedDate = (date) => `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  const startSubsDate = formattedDate(startDate);
  const endSubsDate = formattedDate(endDate);
  // for 7 days ot less 
  const timeDiff = endDate - startDate;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const updateData = async () => {
    setIsLoading(true);
    const { mail } = JSON.parse(sessionStorage.getItem("data"));
    const response = await axios.patch(`${url}/zohouser?mail=${mail}`, {
      subscriptionstatus: "True",
      startdate: startSubsDate,
      enddate: endSubsDate,
    });
    fetchData();
    setIsLoading(false);
  }


  useEffect(() => {
    if (isSuccess === "success") {
      setSnackBar(false);
      updateData();
    } else if (isSuccess === "cancel") {
      setSnackBar(true);
    }
  }, [isSuccess])

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/allsessionsbyprogram/program2`);
      const responseprogram = await axios.get(`${url}/programs/program1`);
      setProgram(responseprogram.data);
      setIsLoading(true);
      if (response?.status === 200) {
        setIsLoading(false);
      }
      setGetProgram(response.data.sessionprogramdata);
    } catch (error) {
      // Handle errors here if needed
    }
  }


  useEffect(() => {
    getData();

  }, []);

  const handleRegister = () => {
    navigate('/checkout')
  }
  const handleJoin = (id) => {

    const youtubeURL = `${id}`;

    window.open(youtubeURL);

  }

  return (
    <>
      <Snackbar
        className="Snackbar"
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleClosed}
      >
        <AlertBox
          autoHideDuration={3000}
          severity="error"
          onClose={handleClosed}
          sx={{ width: "100%" }}
        >
          {"Payment Canceled"}
        </AlertBox>
      </Snackbar>
      <Box>
        <Grid className="active" container sx={{ backgroundColor: "#f2eaf4" }}>
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
              <Card className={`header ${data?.subscriptionstatus.toLowerCase()}`}>
                <Box></Box>
                <Box className='HeaderMain'>
                  {(data?.subscriptionstatus.toLowerCase()) === "true".toLowerCase() ? (
                    <Box className="activeClass-active">
                      <Typography className="activeBtn" variant='h5'><CircleIcon className='circle-icon-active' />Active</Typography>
                    </Box>
                  ) : (
                    <Box className="activeClass-inactive">
                      <Typography className="inactiveBtn" variant='h5'><CircleIcon className='circle-icon-inactive' />Inactive  </Typography>
                    </Box>
                  )}

                  {(data?.subscriptionstatus.toLowerCase() === "false".toLowerCase() || daysLeft <= 7) &&
                    <Box>
                      <Button
                        className="renewBtn"
                        variant='h5'
                        onClick={handleRenew}>Renew now
                      </Button>
                    </Box>
                  }

                </Box>
                <Box>
                  <Typography className=' imgHeader' variant='h5'><LogoutIcon style={{ color: "#fff" }} fontSize='small' className=' logoutIcon' onClick={handleLogout} /> </Typography>
                </Box>
              </Card>


              <Box className="rank_main">


                {/* comment for the future use  */}
                {/* <Box className="rank">
                  <Box>
                    <Card className="card">
                      <CardContent>
                        <Typography variant="h4" className="h5">
                          22
                        </Typography>
                      </CardContent>
                    </Card>
                    <Typography className="rank_title">Rank</Typography>
                    <Typography className="rank_subtitle">
                      ( Worldwide )
                    </Typography>
                  </Box>
                  <Box>
                    <Card className="card">
                      <CardContent>
                        <Typography variant="h4" className="h5">
                          99
                        </Typography>
                      </CardContent>
                    </Card>
                    <Typography className="rank_title">Streak</Typography>
                    <Typography className="rank_subtitle">
                      ( Days Continuity )
                    </Typography>
                  </Box>
                  <Box>
                    <Card className="card">
                      <CardContent>
                        <Typography variant="h4" className="h5">
                          <img src={Group} alt="img" width="35px" />
                        </Typography>
                      </CardContent>
                    </Card>
                    <Typography className="rank_title bold">
                      Badge Name
                    </Typography>
                    <Typography className="rank_subtitle">5/6</Typography>
                  </Box>
                </Box>

                <Divider color="#894D21" /> */}

                <Card className="morning-routine">
                  <Box className="morning-text">
                    <Typography variant="h6" fontWeight="600" fontFamily={'Poppins !important'}>
                      Morning Routine Mastry Program
                    </Typography>
                    <Button style={{ color: "white", fontWeight: '500' }} className="session"
                      onClick={() => { window.open(program.plink, '_blank'); }}>
                      Join Session
                    </Button>
                  </Box>
                </Card>

                {/* Commented for the future  use  */}

                {/* <Card
                  className="progress"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box className="progress-text">
                    <Typography variant="h6" fontWeight="bold">
                      Progress Tracker
                    </Typography>
                    <Typography className="progress-data">
                      Month - June
                    </Typography>
                    <Typography className="progress-data">
                      Day Attendance - 19/24
                    </Typography>
                    <Typography className="progress-data">
                      Maximum Streak - 10 Days
                    </Typography>
                    <Button style={{ color: "#894D21" }} className="report">
                      View Full Report
                    </Button>
                  </Box>
                  <Box
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: "5px",
                      width: "48%",
                      padding: "12px",
                    }}
                  >
                    {[...Array(28)].map((_, index) => (
                      <Card
                        key={index}
                        style={{
                          height: "23px",
                          backgroundColor: generateRandomColor(index),
                        }}
                      ></Card>
                    ))}
                  </Box>
                </Card> */}

                <Box className="text">
                  <Typography variant="h6" fontWeight="bold">
                    Upcoming Sessions
                  </Typography>
                </Box>
                {getProgram?.map((item) => (
                  <div key={item?._id}>
                    {isLoading &&
                      <Loader />}
                    <><Card className="join" style={{ backgroundImage: `url(${item?.imageurl})` }}>

                      <Box className="join-text">
                        <Button onClick={() => handleJoin(item?.slink)} style={{ color: "white" }}>Join</Button>
                      </Box>
                    </Card></>
                  </div>
                ))}
              </Box>
              <Box></Box>

              <Box style={{ marginBottom: "4rem" }}>
                <BottomNavBar />
              </Box>
            </Card>
            <ModalPopUp
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
