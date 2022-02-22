"""
I would want to write a python test that does the following:
- enter a bug_id, or multiple bug_id's
- validate the bug_id request returns a title, description and status
- compare the ID and Response to an existing set of fixture data
- assert the IDs used and their associated responses match the test fixture data
- build it in a way that you can scale out by using an array of bug_ids, and replace the hardcoded values with variables from the array

Using the example of the bug_ID 1234, it could look something like the following - I don't have a lot of experience writing pytest scripts, but this is what I imagine it would look like
"""

class TestExample1234(first.TestCase):
        def setUp(self):
            # load fixture data
            self.getFixture = Fixtures(fixtureLocation ='fixture/directory/location')

        def Validate_bug_id_info(self):
            # this could be done using variables at some point so one could use a range of ids, instead of this single ID, after we validate that the single bug_id check works
            bug_request = self.getfixture(id=1234)
            self.assertEqual(self.title, 'The service is broken')
            self.assertEqual(self.description, 'I tried this thing and it broke')
            self.assertEqual(self.status, 'OPEN')            
