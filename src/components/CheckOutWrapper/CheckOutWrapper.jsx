import React, { useState, useEffect } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { url } from "../../constant";
import Loader from "../Loader/Loader.jsx";

const stripePromise = loadStripe(
  "pk_live_51NM96OSHXHsClBYwsIaUNcUjJCfaytpIq1srFJei4dZse7b4Finuz2PuCjyd93Y8v0TRNaUOB9L8vgzmbPG9AvUz00sUqLnMO6 ",
);

const CheckOutWrapper = () => {
  const [clientSecret, setClientSecret] = useState("");

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    let getUrl =  window.location.origin;
    if(!getUrl.includes('localhost')>0){
      getUrl=`${getUrl}/habit-yoga`
    }
        fetch(`${url}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "amount":"3000",
        "productname":"product yoga",
        "quantity":"1",
        "successurl":`${getUrl}/#/dashboard?payment=success`,
        "cancelurl":`${getUrl}/#/dashboard?payment=cancel`
      })
    })
      .then((res) => res.json())
      .then((data) => window.open(data?.checkouturl,"_self"));
  }, []);

  return (
    <>
      <Box>
        <Grid container>
          <Grid item md={4} xs={0}></Grid>
          <Grid item md={4} xs={12}>
          <Loader />
          </Grid>
          <Grid item md={4} xs={0}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CheckOutWrapper;