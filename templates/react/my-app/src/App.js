import React, { useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSaveOption = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/PreferredOption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ PreferredOption: selectedOption })
      });
      const data = await response.json();
      console.log(data);
      handleClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-6">
          <h1 className="text-left">John Deere 6510</h1>
        </div>
        <div className="col-md-6">
          <p className="text-right mb-0">Country: FR</p>
          <p className="text-right mb-0">Bid price:</p>
          <h2 className="text-right">£24,000</h2>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <img
            src="https://via.placeholder.com/200x200.png?text=Tractor"
            alt="A tractor"
            className="img-fluid mb-4"
          />
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary btn-lg btn-block">Place bid</button>
          <p className="text-right mb-0">Shipping Option</p>
          <p className="text-right mb-0">
            {selectedOption === 'own' ? 'Own transport:£0' : 'Delivery to your yard: £800'}
          </p>
          <Button onClick={handleShow} className="btn btn-link">
            Update
          </Button>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update your shipping option</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingOption"
                  id="deliveryToYard"
                  value="yard"
                  checked={selectedOption === 'yard'}
                  onChange={handleOptionChange}
                />
                <label className="form-check-label" htmlFor="deliveryToYard">
                  Delivery to your yard: £800
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingOption"
                  id="ownTransport"
                  value="own"
                  checked={selectedOption === 'own'}
                  onChange={handleOptionChange}
                />
                <label className="form-check-label" htmlFor="ownTransport">
                  Own transport
                </label>
              </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                const option = selectedOption;
                fetch("http://127.0.0.1:5000/PreferredOption", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ PreferredOption: option }),
                })
                  .then((response) => response.text())
                  .then((data) => {
                    console.log(data);
                    handleClose();
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }}
            >
              Save
            </Button>
          </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
