import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';



function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const locale = searchParams.get('locale') || 'FR';
  const [shippingCost, setShippingCost] = useState(null);
  const [country, setCountry] = useState('');




  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("locale");
    setCountry(countryParam);
  }, []);

    useEffect(() => {
      fetch(`http://localhost:5000/shippingCost/${country}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShippingCost(data[country]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }, [country]);

    useEffect(() => {
    if (country) {
      fetch(`http://localhost:5000/shippingCost/${country}`)
        .then((response) => response.json())
        .then((data) => {
          setShippingCost(data.cost);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [country]);


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
          <p className="text-right mb-0">Country: {locale.toUpperCase()}</p>
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
            {selectedOption === 'own' ? 'Own transport: £0' : `Delivery to your yard: £${shippingCost}`}
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
                checked={selectedOption === "yard"}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor="deliveryToYard">
                Delivery to your yard: £{shippingCost || "Loading..."}
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
