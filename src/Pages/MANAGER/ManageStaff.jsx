import React from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const ManageStaff = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Manage Staff</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>USER TYPE</th>
                  <th>GENDER</th>
                  <th>MOBILE NO</th>
                  <th>DATE OF BIRTH</th>
                  <th>ADDRESS</th>
                  <th>CATEGORY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>john.doe@example.com</td>
                  <td>123-456-7890</td>
                  <td>123 Main St</td>
                  <td>Active</td>
                  <td>
                    <Link to={`/edit/${1}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>Employee</td>
                  <td>jane.smith@example.com</td>
                  <td>987-654-3210</td>
                  <td>456 Elm St</td>
                  <td>Inactive</td>
                  <td>
                    <Link to={`/edit/${2}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>john.doe@example.com</td>
                  <td>123-456-7890</td>
                  <td>123 Main St</td>
                  <td>Active</td>
                  <td>
                    <Link to={`/edit/${1}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>john.doe@example.com</td>
                  <td>123-456-7890</td>
                  <td>123 Main St</td>
                  <td>Active</td>
                  <td>
                    <Link to={`/edit/${1}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>john.doe@example.com</td>
                  <td>123-456-7890</td>
                  <td>123 Main St</td>
                  <td>Active</td>
                  <td>
                    <Link to={`/edit/${1}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                {/* Add more rows for other staff members */}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>USER TYPE</th>
                  <th>GENDER</th>
                  <th>MOBILE NO</th>
                  <th>DATE OF BIRTH</th>
                  <th>ADDRESS</th>
                  <th>CATEGORY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>john.doe@example.com</td>
                  <td>123-456-7890</td>
                  <td>123 Main St</td>
                  <td>Active</td>
                  <td>
                    <Link to={`/edit/${1}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>Employee</td>
                  <td>jane.smith@example.com</td>
                  <td>987-654-3210</td>
                  <td>456 Elm St</td>
                  <td>Inactive</td>
                  <td>
                    <Link to={`/edit/${2}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>john.doe@example.com</td>
                  <td>123-456-7890</td>
                  <td>123 Main St</td>
                  <td>Active</td>
                  <td>
                    <Link to={`/edit/${1}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>john.doe@example.com</td>
                  <td>123-456-7890</td>
                  <td>123 Main St</td>
                  <td>Active</td>
                  <td>
                    <Link to={`/edit/${1}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>john.doe@example.com</td>
                  <td>123-456-7890</td>
                  <td>123 Main St</td>
                  <td>Active</td>
                  <td>
                    <Link to={`/edit/${1}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
                {/* Add more rows for other staff members */}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
