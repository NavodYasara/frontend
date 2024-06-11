import React, { useEffect, useState } from 'react';
import { Modal, message, Row, Col, Typography } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined, CalendarOutlined, SafetyOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Title, Text } = Typography;

const CareTakerShowingModel = ({ careTakerShowingModelOpen, setCareTakerShowingModelOpen, selectedCareTaker }) => {
  const [careTakerDetails, setCareTakerDetails] = useState(null);

  useEffect(() => {
    if (careTakerShowingModelOpen) {
      getCareTakerDetails();
    }
  }, [careTakerShowingModelOpen]);

  const getCareTakerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/manager/getCaretakerById/${selectedCareTaker}`);
      setCareTakerDetails(response.data);
    } catch (error) {
      message.error("Error fetching caretaker details!");
    }
  };

  const handleOk = () => {
    setCareTakerShowingModelOpen(false);
  };
  const handleCancel = () => {
    setCareTakerShowingModelOpen(false);
  };

  return (
    <Modal
      centered
      title="Care Taker Details"
      open={careTakerShowingModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={"60%"}
    >
      {careTakerDetails ? (
        <div className="container">
          <Row gutter={[16, 16]} className="mb-2">
            <Col span={24}>
              <Title level={4}><UserOutlined /> Care Taker Information</Title>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-2">
            <Col span={12}>
              <Text strong><UserOutlined /> Name: </Text>
              <Text>{`${careTakerDetails.firstName} ${careTakerDetails.lastName}`}</Text>
            </Col>
            <Col span={12}>
              <Text strong><PhoneOutlined /> Mobile No: </Text>
              <Text>{careTakerDetails.mobileNo}</Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-2">
            <Col span={12}>
              <Text strong><HomeOutlined /> Address: </Text>
              <Text>{careTakerDetails.address}</Text>
            </Col>
            <Col span={12}>
              <Text strong><IdcardOutlined /> National ID: </Text>
              <Text>{careTakerDetails.nationalId}</Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-2">
            <Col span={12}>
              <Text strong><CalendarOutlined /> Date of Birth: </Text>
              <Text>{new Date(careTakerDetails.dob).toLocaleDateString()}</Text>
            </Col>
            <Col span={12}>
              <Text strong><SafetyOutlined /> Medical Condition: </Text>
              <Text>{careTakerDetails.mediCondition}</Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-2">
            <Col span={12}>
              <Text strong><UserOutlined /> Category: </Text>
              <Text>{careTakerDetails.category}</Text>
            </Col>
            <Col span={12}>
              <Text strong><PhoneOutlined /> Emergency Contact: </Text>
              <Text>{careTakerDetails.emergCont}</Text>
            </Col>
          </Row>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default CareTakerShowingModel;
