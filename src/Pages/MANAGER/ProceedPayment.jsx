// src/components/PaymentPage.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const PaymentPage = () => {
  const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  const [caretakers, setCaretakers] = useState([]);
  const [payments, setPayments] = useState({});

  useEffect(() => {
    fetchCaretakers();
  }, []);

  const fetchCaretakers = async () => {
    try {
      const response = await axios.get("/api/getFinalizedPlans"); 
      setCaretakers(response.data);
    } catch (error) {
      console.error("Error fetching caretakers:", error);
    }
  };

  const handlePaymentChange = (caretakerId, amount) => {
    setPayments({
      ...payments,
      [caretakerId]: amount,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/updatePayments", payments);
      alert("Payments updated successfully!");
    } catch (error) {
      console.error("Error updating payments:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            <Container component={Paper} sx={{ padding: 4, marginTop: 4 }}>
              <Typography variant="h4" gutterBottom>
                Proceed with Payments
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Requirement</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {caretakers.map((caretaker) => (
                    <TableRow key={caretaker.caretakerId}>
                      <TableCell>{caretaker.firstName}</TableCell>
                      <TableCell>{caretaker.lastName}</TableCell>
                      <TableCell>{caretaker.requirement}</TableCell>
                      <TableCell>{caretaker.startDate}</TableCell>
                      <TableCell>{caretaker.endDate}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={payments[caretaker.caretakerId] || ""}
                          onChange={(e) =>
                            handlePaymentChange(
                              caretaker.caretakerId,
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box textAlign="center" marginTop={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Update Payments
                </Button>
              </Box>
            </Container>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
