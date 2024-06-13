import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const PaymentPopup = ({ isVisible, onClose, requirementId }) => {
  const [price, setPrice] = useState('');

  const handleOk = () => {
    // Handle the payment logic here, such as updating the backend with the price
    console.log(`Requirement ID: ${requirementId}, Price: ${price}`);
    onClose();
  };

  return (
    <Modal
      title="Proceed Payment"
      visible={isVisible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <p>Add the price for the relevant service:</p>
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
      />
    </Modal>
  );
};

export default PaymentPopup;
