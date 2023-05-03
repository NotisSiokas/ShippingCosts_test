# Shipping Costs Test

#### Purpose of this project
This project is part of the coding test for the role of Junior Full-Stack Developer at Spectinga.

Candidate: Notis Siokas


### This is a simple Flask-based and React project that calculates the shipping cost based on the user's location and preferred shipping option.


## Installation

1. Clone this repository to your local machine.
2. Install the required packages by running `pip install -r requirements.txt` in the project directory.

## Usage

### Flask
1. Run the Flask server by executing `python app.py` in the project directory.
2. Send a GET request to `http://localhost:5000/shippingCost/{locale}` to get the shipping cost for a specific locale. This function is operating, and it returns the countries costs.
3. Send a POST request to `http://localhost:5000/PreferredOption` with a JSON payload in the following format: `{"PreferredOption": "{option}"}` to save the user's preferred shipping option. 
This function can get the POST command from the React app, however it does not save the preference on a database.

### React

To run the React app, follow these steps:

1. Navigate to the client directory in your terminal:
    `cd client`
2. Install the required dependencies by running:
    `npm install`
3. Start the development server by running:
    `npm start`
4. Open your web browser and navigate to http://localhost:3000 to view the app.

Notes: The Flask server must be running in order for the React app to function properly. Follow the instructions in the previous section to start the Flask server.
Changing manually the URL to http://localhost:3000/?locale=XX (XX = Country code e.g. ES for Spain) for providing the necessary input.

## Tests

To run the tests, execute `python test_app.py` in the project directory.
There are two test cases: one for an invalid locale and one for an invalid shipping option.
