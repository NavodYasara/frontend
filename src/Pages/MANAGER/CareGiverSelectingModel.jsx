import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Avatar, Input, message } from 'antd';
import { UserOutlined, PhoneOutlined, CalendarOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Meta } = Card;
const { TextArea } = Input;

const CareGiverSelectingModel = ({ openCareGiverSelectingModel, setOpenCareGiverSelectingModel, selectedRequirment,fetchPendingTasks }) => {
  const [caregivers, setCaregivers] = useState([]);
  const [selectedCareGiver, setSelectedCareGiver] = useState(null);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (openCareGiverSelectingModel) {
      fetchAvailableCareGivers();
    }
  }, [openCareGiverSelectingModel]);

  const fetchAvailableCareGivers = async () => {
    try {
      const careGiverResult = await axios.get("http://localhost:5000/api/manager/getCaregivers");
      setCaregivers(careGiverResult.data[selectedRequirment]);
    } catch (error) {
      console.log("error! ", error);
      message.error("Care givers adding error!")
    }
  };

  const updateCareGiver = async () => {
    try {
        const caregiverData={
            caregiverId: selectedCareGiver,
            instructions: instructions,
            requirementId:selectedRequirment
        }
    if (selectedCareGiver!=null) {
        const response = await axios.post("http://localhost:5000/api/manager/addCareGiverAndInstructions", caregiverData);
        if(response.status === 200){
          message.success('Caregiver updated successfully');
          fetchPendingTasks();
        } else {
          message.error('Failed to update caregiver');
        }
    }
     
    } catch (error) {
      console.log("error ", error);
      message.error('Failed to update caregiver');
    }
  }

  const handleOk = () => {
    updateCareGiver();
    setOpenCareGiverSelectingModel(false);
  };
  const handleCancel = () => {
    setOpenCareGiverSelectingModel(false);
  };

  return (
    <Modal
      centered
      title="Caregiver Selection"
      open={openCareGiverSelectingModel}
      onOk={handleOk}
      okText="Add Selected CareGiver"
      onCancel={handleCancel}
      width={"50%"}
    >
      <div>
        <p>Add Instructions</p>
        <TextArea rows={5} value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      </div>
      <div className="container mt-3">
        <div className="row">
          {caregivers.map(caregiver => (
            <div className="col-md-6" key={caregiver.caregiverId}>
              <Card
                onClick={() => setSelectedCareGiver(caregiver.caregiverId)}
                style={{
                  marginBottom: 16,
                  backgroundColor: selectedCareGiver === caregiver.caregiverId ? '#e6f7ff' : '#fff',
                  cursor: 'pointer',
                  border: selectedCareGiver === caregiver.caregiverId ? '1px solid #1890ff' : '1px solid #f0f0f0'
                }}
              >
                <Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={`${caregiver.firstName} ${caregiver.lastName}`}
                  description={
                    <div>
                      <p><PhoneOutlined /> {caregiver.mobileNo}</p>
                      <p><CalendarOutlined /> {new Date(caregiver.dob).toLocaleDateString()}</p>
                      <p>{caregiver.gender === 'male' ? <ManOutlined /> : <WomanOutlined />} {caregiver.gender}</p>
                      <p><UserOutlined /> {caregiver.availability}</p>
                    </div>
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CareGiverSelectingModel;
