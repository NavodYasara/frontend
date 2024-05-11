import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";


const ManagerStaff = () => {
  // Sample data for caretaker (replace with actual data fetched from backend)
  const [caretaker, setcaretaker] = useState([
    { id: 1, name: "Alice Johnson", specialty: "Elderly Care" },
    { id: 2, name: "Bob Smith", specialty: "Special Needs Care" },
  ]);

  const [caregiver, setcaregiver] = useState([
    { id: 3, name: "Carol Davis", specialty: "Pediatric Care" },
    { id: 4, name: "David Wilson", specialty: "Dementia Care" },
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryCg, setSearchQueryCg] = useState("");

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchChangeCg = (event) => {
    setSearchQueryCg(event.target.value);
  };

  // Function to filter caretaker based on search query
  const handleFilter = () => {
    const filteredcaretaker = caretaker.filter((caretaker) =>
      caretaker.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredcaretaker;
  };

  const handleFilterCg = () => {
    const filteredcaregiver = caregiver.filter((caregiver) =>
      caregiver.name.toLowerCase().includes(searchQueryCg.toLowerCase())
    );
    return filteredcaregiver;
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>
      <div
        fluid
        className="vh-100 d-flex "
        style={{ width: "100%", marginTop: "50px" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Container className="caretakerlist">
              <Grid container spacing={1}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      label="Search for a caretaker"
                      variant="outlined"
                      fullWidth
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFilter}
                    >
                      OK
                    </Button>
                  </Grid>
                </Grid>

                {/* Display filtered caretaker list */}
                {handleFilter().map((caretaker) => (
                  <Grid item xs={12} key={caretaker.id}>
                    <Paper elevation={3} style={{ padding: "20px" }}>
                      <Typography variant="h5" gutterBottom>
                        {caretaker.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Specialty: {caretaker.specialty}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>

          <Grid item xs={6}>
            <Container className="ccaregiverlist">
              <Grid container spacing={1}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      label="Search for a Caregiver"
                      variant="outlined"
                      fullWidth
                      value={searchQueryCg}
                      onChange={handleSearchChangeCg}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFilterCg}
                    >
                      OK
                    </Button>
                  </Grid>
                </Grid>

                {/* Display filtered caregiver list */}
                {handleFilterCg().map((caregiver) => (
                  <Grid item xs={12} key={caregiver.id}>
                    <Paper elevation={3} style={{ padding: "20px" }}>
                      <Typography variant="h5" gutterBottom>
                        {caregiver.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Specialty: {caregiver.specialty}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ManagerStaff;
