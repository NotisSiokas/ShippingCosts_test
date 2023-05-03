# Shipping Cost API

#### Purpose of this project
This project is part of the coding test for the role of Junior Full-Stack Developer at Spectinga
Candidate: Notis Siokas


### This is a simple Flask-based and React project that calculates the shipping cost based on the user's location and preferred shipping option.


## Installation

1. Clone this repository to your local machine.
2. Install the required packages by running `pip install -r requirements.txt` in the project directory.

## Usage

1. Run the Flask server by executing `python app.py` in the project directory.
2. Send a GET request to `http://localhost:5000/shippingCost/{locale}` to get the shipping cost for a specific locale.
3. Send a POST request to `http://localhost:5000/PreferredOption` with a JSON payload in the following format: `{"PreferredOption": "{option}"}` to save the user's preferred shipping option.

## Tests

To run the tests, execute `python test_app.py` in the project directory.
There are two test cases: one for an invalid locale and one for an invalid shipping option.
