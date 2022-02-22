"""
I've only ever really built API tests using Postman, which uses a nodeJS mocha/chai syntax, but I will do my best to demonstrate test cases using Pytest Requests library syntax
I would've liked to have a 'response time does not exceed 2500ms' assertion, but I am not entirely sure how to do that with this framework. 
In Postman it would look something like: expect(pm.response.responseTime).to.be.below(200);
Ideally, each of these tests would have the standard assertion of the function (GET, POST, PATCH, PUT, DELETE...) and then validate both the appropriate status code is returned (200, 400, 500, whatever) and that it responded in less time then 2500ms.
Unfortunately, I am not as familiar with the syntax to be able to do that here
"""

import requests
import json

def test_get_equals_200():
    response = requests.get("https://bugs.info:4000/api/v1/bugs/<BUG_ID>")
    assert response.status_code == 200
    assert json.data.status === 'OPEN'


def test_edit_status_closed():
    equests.put.status("https://bugs.info:4000/api/v1/bugs/<BUG_ID>", 'Closed')
    assert json.data.status === 'CLOSED'
    assert response.status_code == 200

def test_get_validate_status_changed():
    response = requests.get("https://bugs.info:4000/api/v1/bugs/<BUG_ID>")
    assert response.status_code == 200
    assert json.data.status === 'CLOSED'

def test_bad_id_validate_not_found_message():
    response = requests.get("https://bugs.info:4000/api/v1/bugs/<BAD_BUG_ID>")
    assert response.status_code == 400
    assert response.message === "NOT FOUND"

def get_sees_full_bug_id_list():
    response = requests.get = ("https://bugs.info:4000/api/v1/bugs/")
    assert response.status_code == 200
    assert response.time.


def test_update_description():
    response = requests.patch("https://bugs.info:4000/api/v1/bugs/<BUG_ID>", "QA update description field to this generic string")
    assert json.data.description == = "QA update description field to this generic string"
    assert response.status_code == 200
