import React from "react";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const PaymentPage = () => {
  // Sample data for the caregiver details, service period, and price
  const caregiverDetails = {
    name: "John Doe",
    age: 45,
    experience: "10 years",
  };

  const servicePeriod = "01/06/2024 - 30/06/2024";
  const price = "$1500";

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <Typography variant="h4" gutterBottom>
                Payment Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Caregiver Details</Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Name"
                        secondary={caregiverDetails.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Age"
                        secondary={caregiverDetails.age}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Experience"
                        secondary={caregiverDetails.experience}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Service Period</Typography>
                  <Typography variant="body1">{servicePeriod}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Price</Typography>
                  <Typography variant="body1">{price}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="primary" fullWidth>
                    Proceed to Pay
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" color="primary" fullWidth>
                    Select Payment Option
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
