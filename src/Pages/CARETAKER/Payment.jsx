import React from 'react';
import Sidebar from '../../Components/Sidebar2';
import { Container, Form, Button } from 'react-bootstrap';

function Payment() {
    // Dummy payment data for demonstration
    const paymentData = {
        amount: 100,
        currency: 'USD',
        recipient: 'John Doe',
        paymentMethod: 'Credit Card',
        transactionDate: '2024-05-10',
        status: 'Successful',
        reference: 'TRX123456789'
    };

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Sidebar />
            </div>

            <div style={{ marginLeft: '280px' }}>
                <Container fluid className="vh-100 d-flex " style={{ width: '100%' }}>
                    <div className="flex-grow-2">
                        <div className="d-flex justify-content-center align-items-center h-100 ">
                            <div className="text-center p-4 shadow rounded" style={{ width: '50vw' }}>
                                <h2>Payment Section</h2>
                                <hr />
                                <h4>Make a Payment</h4>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formPaymentAmount">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="number" placeholder="Enter amount" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPaymentMethod">
                                        <Form.Label>Payment Method</Form.Label>
                                        <Form.Control as="select">
                                            <option>Credit Card</option>
                                            <option>Debit Card</option>
                                            <option>Bank Transfer</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Submit Payment
                                    </Button>
                                </Form>
                                <hr />
                                <h4>Recent Payments</h4>
                                <ul>
                                    <li>
                                        <strong>Amount:</strong> {paymentData.amount} {paymentData.currency}
                                    </li>
                                    <li>
                                        <strong>Recipient:</strong> {paymentData.recipient}
                                    </li>
                                    <li>
                                        <strong>Payment Method:</strong> {paymentData.paymentMethod}
                                    </li>
                                    <li>
                                        <strong>Date:</strong> {paymentData.transactionDate}
                                    </li>
                                    <li>
                                        <strong>Status:</strong> {paymentData.status}
                                    </li>
                                    <li>
                                        <strong>Reference:</strong> {paymentData.reference}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Payment;
