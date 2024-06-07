import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import LockIcon from "@mui/icons-material/Lock";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { url } from "../../../constant";
import "../Resource";
import "../Resource.css";
import { useNavigate } from "react-router";

const Video = ({ section }) => {
  const [data, setData] = useState();
  const [ytData, setYtData] = useState([]);
  const navigate = useNavigate();
  const handleRenew = () => {
    navigate("/checkOut");
  };
  const { mail, loginkey } = JSON.parse(sessionStorage.getItem("data"));
  const fetchYt = async () => {
    try {
      const response = await axios.get(`${url}/allytlinks/${mail}/${loginkey}`);
      setYtData(response.data.ytlinkdata);
    } catch (error) {}
  };
  const fetchData = async () => {
    try {
      const { mail } = JSON.parse(sessionStorage.getItem("data"));
      const response = await axios.get(`${url}/getzohouser/${mail}`);
      setData(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchYt();
    fetchData();
  }, []);
  return (
    <div>
      {section === "video" && (
        <Container sx={{ my: 2 }}>
          {ytData?.map((element, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardContent
                sx={{
                  maxHeight: "320px",
                }}
              >
                {data?.subscriptionstatus === "True" ? (
                  <ReactPlayer
                    width="100%"
                    height="70%"
                    controls
                    playing={false}
                    url={element.link}
                  />
                ) : (
                  <div className="video-container">
                    <ReactPlayer
                      width="100%"
                      height="70%"
                      url={element.link}
                      controls={false}
                    />
                  </div>
                )}
                
                <Box height={"30%"}>
               
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "1.5rem",
                      m: 1,
                      fontWeight: "bold",
                    }}
                  >
                    {element?.title}
                    {data?.subscriptionstatus.toLowerCase() === "false".toLowerCase() &&
                    <LockIcon fontSize="1.5rem" className="lockIcon" />}
                  </Typography>
                
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1rem",
                      m: 1,
                      fontWeight: "normal",
                      color: "grey",
                    }}
                  >
                    {element?.description}
                  </Typography>
                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {data?.subscriptionstatus === "false" && (
                      <>
                        <LockIcon fontSize="10px" className="lockIcon" />
                        <Button
                          className="subscribe_now_btn"
                          onClick={handleRenew}
                        >
                          Subscribe Now
                        </Button>
                      </>
                    )}
                  </Box> */}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Container>
      )}
    </div>
  );
};
export default Video;
