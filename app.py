from flask import Flask, jsonify, request
from pyairtable import Table
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

api_key = 'keyUS3NGlplBjT43a'
base_id = 'appdEweaYaM57dnfg'
table_name = 'tblt0S24Fts0fEF87'
table = Table(api_key, base_id, table_name)


@app.route('/shippingCost/<locale>', methods=['GET'])
def get_shipping_cost(locale):
    # Retrieve data from Airtable
    records = table.all()

    # Convert the records to a JSON format
    data = {}
    for record in records:
        destination = record['fields']['Destination']
        if destination == locale:
            if 'Fee' in record['fields']:
                fee = record['fields']['Fee']
            else:
                fee = 'empty'
            data[destination] = fee

    # Return the data as a JSON response
    return jsonify(data)


@app.route('/PreferredOption', methods=['POST'])
def save_shipping_option():
    request_data = request.get_json()
    shipping_option = request_data.get('PreferredOption')
    if shipping_option == 'own' or shipping_option == 'yard':
        # Save the shipping option in Airtable
        record_data = {
            'Option': shipping_option
        }
        table.insert(record_data)
        return f"Shipping option saved: {shipping_option}"
    else:
        return "Invalid option"


if __name__ == '__main__':
    app.run()
