import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { Container, Table } from "react-bootstrap";
import Button from "@mui/material/Button";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

function CaretakerDashboard() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    requirements: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = async (event) => {
    console.log("F_Name", profileData.firstName);
    console.log("L_Name", profileData.lastName);
    console.log("Age", profileData.age);
    console.log("Address", profileData.address);
    console.log("Contact", profileData.contactNumber);
    console.log("Requirements", profileData.requirements);
    try {
      const response = await axios.put("http://localhost:5000/server/updatecaretakerprofile", {

        firstName: profileData.firstName,
        lastName: profileData.lastName,
        age: profileData.age,
        address: profileData.address,
        contactNumber: profileData.contactNumber,
        requirements: profileData.requirements,

      });
      console.log(response.data);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>

      <div
        fluid
        className="vh-100 d-flex "
        style={{ width: "100%", marginTop: "100px" }}
      >
        <Container>
          <div className="flex-grow-2 ">
            <div className="d-flex justify-content-center align-items-center h-100">
              <div
                className="text-center p-4 shadow rounded"
                style={{ width: "50vw" }}
              >
                <Table borderless className="invisible-table">
                  <tbody>
                    <tr>
                      <td className="fw-bold">First Name:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleChange}
                          />
                        ) : (
                          profileData.firstName
                        )}
                      </td>
                    </tr>
<tr>
  <td className="fw-bold">Last Name:</td>
  <td>
    {editMode ? (
      <input
        type="text"
        name="lastName"
        value={profileData.lastName}
        onChange={handleChange}
      />
    ) : (
      profileData.lastName
    )}
  </td>
</tr>
<tr>
  <td className="fw-bold">Age:</td>
  <td>
    {editMode ? (
      <input
        type="number"
        name="age"
        value={profileData.age}
        onChange={handleChange}
      />
    ) : (
      profileData.age
    )}
  </td>
</tr>
<tr>
  <td className="fw-bold">Address:</td>
  <td>
    {editMode ? (
      <input
        type="text"
        name="address"
        value={profileData.address}
        onChange={handleChange}
      />
    ) : (
      profileData.address
    )}
  </td>
</tr>
<tr>
  <td className="fw-bold">Contact Number:</td>
  <td>
    {editMode ? (
      <input
        type="text"
        name="contactNumber"
        value={profileData.contactNumber}
        onChange={handleChange}
      />
    ) : (
      profileData.contactNumber
    )}
  </td>
</tr>
<tr>
  <td className="fw-bold">
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
      >
        Disable Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() =>
            setSelectedCategory("Mental disorders")
          }
        >
          Mental disorders
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            setSelectedCategory("Physical Disability")
          }
        >
          Physical Disability
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setSelectedCategory("Eldering")}
        >
          Eldering
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </td>
  <td>{selectedCategory}</td>
</tr>
<tr>
  <td className="fw-bold">Your requirements:</td>
  <td>
    {editMode ? (
      <input
        type="text"
        name="requirements"
        value={profileData.requirements}
        onChange={handleChange}
      />
    ) : (
      profileData.requirements
    )}
  </td>
</tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {editMode ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                  onClick={handleSave}
                >
                  Ok
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default CaretakerDashboard;

