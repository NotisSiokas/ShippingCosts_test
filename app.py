from flask import Flask, jsonify
from pyairtable import Table

app = Flask(__name__)

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
                fee = 'null'
            data[destination] = fee

    # Return the data as a JSON response
    return jsonify(data)


if __name__ == '__main__':
    app.run()
