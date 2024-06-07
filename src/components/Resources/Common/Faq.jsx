import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { url } from "../../../constant";
import '../Resource';
const Faq = ({ section }) => {
    const [faqsData, setFaqsData] = useState([]);
    const { mail, loginkey } = JSON.parse(sessionStorage.getItem("data"));
    const fetchFaqs = async () => {
        try {
            const response = await axios.get(`${url}/allfaqs/${mail}/${loginkey}`);
            setFaqsData(response.data.faqdata);
        } catch (error) { }
    };
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        fetchFaqs();
    }, []);
    return (
        <div>
            {section === "faqs" && (
                <Container sx={{ my: 2 }}>
                    {faqsData?.map((element, index) => (
                        <Accordion key={index} className="accordian">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: "#e5e7eb",
                                    borderRadius: "15px",
                                }}
                            >
                                <Typography>{element?.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    backgroundColor: "#f3f4f6",
                                    borderRadius: "15px",
                                    marginTop: "4px",
                                }}
                            >
                                <Typography>{element?.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            )}
        </div>
    );

}
export default Faq;