import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [showModal, setShowModal] = useState(false);  // state for showing/hiding modal
  const [selectedOption, setSelectedOption] = useState('');  // state for selected shipping option
  const [error, setError] = useState(null);  // state for errors
  const searchParams = new URLSearchParams(window.location.search);  // get URL search parameters
  const locale = searchParams.get('locale') || 'FR';  // get locale parameter or set it to default value 'FR'
  const [shippingCost, setShippingCost] = useState(null);  // state for shipping cost
  const [country, setCountry] = useState('');  // state for country name

  const handleClose = () => setShowModal(false);  // handler function to hide the modal
  const handleShow = () => setShowModal(true);  // handler function to show the modal

  const handleOptionChange = (event) => {  // handler function to update selected shipping option
    setSelectedOption(event.target.value);
  };

  // This useEffect hook retrieves the "locale" parameter from the URL query string, and sets the "country" state variable to its value
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("locale");
    setCountry(countryParam);
  }, []);

 // This useEffect hook retrieves the shipping cost for the selected country and updates the "shippingCost" state variable accordingly
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

  // This useEffect hook retrieves the shipping cost for the selected country and updates the "shippingCost" state variable accordingly
  // This hook is similar to the previous one, but it only runs if the "country" state variable is truthy (i.e., it has a value)
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

  // Define an async function called handleSaveOption
  const handleSaveOption = async () => {
    try {
      // Make a POST request to the specified URL with the selected option as the body
      const response = await fetch('http://127.0.0.1:5000/PreferredOption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ PreferredOption: selectedOption })
      });
      // Get the response data in JSON format
      const data = await response.json();
      console.log(data);
      // Close the modal
      handleClose();
    } catch (error) {
      // If there is an error, log the error and set the error message
      console.error(error);
      setError(error.message);
    }
  };

  return (
    // The outermost div element has the class "container"
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
          {/* The shipping option can be either "own" or "yard" and the price is displayed based on the selected option */}
          <p className="text-right mb-0">
            {selectedOption === 'own' ? 'Own transport: £0' : `Delivery to your yard: £${shippingCost}`}
          </p>
          {/* The "Update" button opens a modal when clicked */}
          <Button onClick={handleShow} className="btn btn-link">
            Update
          </Button>
          {/* The modal contains a form with two radio buttons to select the shipping option */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update your shipping option</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* The first button allows the user to select "Delivery to your yard" */}
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
            {/* The second button allows the user to select "Own transport" */}
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
            <Modal.Footer> // a footer section for a modal component
              <Button variant="secondary" onClick={handleClose}> // a button with a "secondary" style variant and an onClick event listener that triggers the handleClose function
                Cancel
              </Button>
              <Button // a button with a "primary" style variant and an onClick event listener that triggers a function
                variant="primary"
                onClick={() => {
                  const option = selectedOption; // a constant variable "option" that is set to the value of "selectedOption"
                  fetch("http://127.0.0.1:5000/PreferredOption", { // a fetch request that sends data to a local server at the specified URL
                    method: "POST", // the HTTP request method used
                    headers: { // the headers included in the request
                      "Content-Type": "application/json", // specifies the type of data being sent
                    },
                    body: JSON.stringify({ PreferredOption: option }), // the data being sent, which is a JSON string containing a key-value pair with the key "PreferredOption" and the value of the "option" variable
                  })
                    .then((response) => response.text()) // returns a promise that resolves to the response body as text
                    .then((data) => {
                      console.log(data); // logs the response data to the console
                      handleClose(); // calls the handleClose function
                    })
                    .catch((error) => {
                      console.error("Error:", error); // logs any errors to the console
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