import unittest
import requests
import json


class TestShippingCost(unittest.TestCase):

    def setUp(self):
        self.base_url = 'http://127.0.0.1:5000'

    def test_get_shipping_cost_invalid_locale(self):
        # Test case for an invalid locale
        locale = 'invalid'
        expected_result = {}

        response = requests.get(f'{self.base_url}/shippingCost/{locale}')
        result = json.loads(response.text)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(result, expected_result)

    def test_save_shipping_option_invalid_option(self):
        # Test case for an invalid shipping option
        shipping_option = 'invalid'
        expected_result = "Invalid option"

        headers = {'Content-type': 'application/json'}
        data = {'PreferredOption': shipping_option}
        response = requests.post(f'{self.base_url}/PreferredOption', headers=headers, data=json.dumps(data))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, expected_result)


if __name__ == '__main__':
    unittest.main()
