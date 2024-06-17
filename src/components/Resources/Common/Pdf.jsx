import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../../constant";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import "../Resource.css";
import LockIcon from "@mui/icons-material/Lock";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
const Pdf = ({ section }) => {
  const [data, setData] = useState();
  const { mail, loginkey } = JSON.parse(sessionStorage.getItem("data"));
  const [pdfData, setPdfData] = useState([]);
  const navigate = useNavigate();

  const handleRenew = () => {
    navigate("/checkOut");
  };
  const fetchPdf = async () => {
    try {
      const response = await axios.get(
        `${url}/allpdflinks/${mail}/${loginkey}`
      );
      setPdfData(response.data.pdflinkdata);
    } catch (error) {
      console.log("Pdf : ", error)
     }
  };
  const fetchData = async () => {
    try {
      const { mail } = JSON.parse(sessionStorage.getItem("data"));
      const response = await axios.get(`${url}/getzohouser/${mail}`);
      setData(response.data);
    } catch (error) { console.log("Pdf : ", error) }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log(section);
    fetchPdf();
    fetchData();
  }, []);
  const handleDownload = (element) => {
    window.open(element.link, "_blank");
  };

  return (
    <>
      {/* <div>
        {section === "pdf" && (
          <Container sx={{ my: 2 }}>
            {pdfData?.map((element, index) => (
              <Card key={index} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {element?.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mt: 2,
                    }}
                  >
                    {element?.description}

                  </Typography>
                  <img src={"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"}
                    alt="Image"
                    style={{ width: "100%", marginTop: "10px" }} />
                  {data?.subscriptionstatus === "True" ?
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >

                      <Button
                        className="download_btn"
                        sx={{
                          bgcolor: "green",
                          color: "#fff",
                          fontSize: "0.8rem",
                          mt: 2,
                        }}


                        onClick={() => handleDownload(element)}
                      >
                        Download
                        <SaveAltIcon />
                      </Button>
                    </Box>
                    :
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "not-allowed"
                      }}
                    >
                      <Button
                        className="download_btn"
                        sx={{
                          bgcolor: "green",
                          color: "#fff",
                          fontSize: "0.8rem",
                          mt: 2,
                        }}
                        disabled
                        onClick={() => handleDownload(element)}
                      >
                        Download
                        <SaveAltIcon />
                      </Button>
                    </Box>}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px',
                    }}
                  >
                    {data?.subscriptionstatus === "false" &&

                      <><LockIcon fontSize="10px" className="lockIcon" />
                        <Button className="subscribe_now_btn" onClick={handleRenew}>Subscribe Now</Button></>}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Container>
        )}
      </div> */}

      <div>
        {section === "pdf" && (
          <Container sx={{ my: 2 }}>

            {/* <Grid marginBottom={5}>
              <Grid container className="card-data">
                <Grid xs={5} style={{ position: "relative" }}>
                  <img src={"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"}
                    alt="Image" className="imgPdf" />
                  <Button className="download_btn">Download<SaveAltIcon /></Button>
                </Grid>
                <Grid xs={7} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem", }}>tilte</Typography>
                  <Typography sx={{ fontSize: "1rem" }}>description</Typography>
                </Grid>
              </Grid>
            </Grid> */}
            {pdfData?.map((element, index) => (
              <Grid key={index} >
                <Grid container className="card-data">
                  <Grid xs={5} style={{ position: "relative" }}>
                    <img src={element.imageurl}
                      alt="Image" className="imgPdf lockPdf" />
                    <div className="image-text">
                      {/* <Typography>Invite 1 Friend to unlock</Typography> */}
                      {data?.subscriptionstatus.toLowerCase() === "false".toLowerCase() &&
                      <Typography><LockIcon sx={{ fontSize: '25px',marginTop: '3rem' }} /></Typography> }
                    </div>
                    {data?.subscriptionstatus.toLowerCase() === "True".toLowerCase() ?
                      <Button className="download_btn"  onClick={() => handleDownload(element)}>Download<SaveAltIcon /></Button> :
                      <Button className="download_btn unlock_btn" onClick={handleRenew}>Unlock</Button>}
                  </Grid>
                  <Grid xs={7} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem", }}>{element.title}</Typography>
                    <Typography sx={{ fontSize: "1rem" }}>{element.description}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Container>
        )}
      </div>
    </>
  );
};
export default Pdf;
