"""
I've only ever really used WebdriverIO for front end testing, since the QA methods I've used were more code-agnostic, and tools based, rather then language based.
I have typically done my test writing in a mocha-chai nodeJS syntax used by https://webdriver.io/, which is the tool I have used the most throughout my career
doing webdriver using Python is new to me, so this may not be perfect, but this is a close approximation to what I would imagine a functional UI E2E style test would look like
"""


from selenium import webdriver class SubmitPage(BasePage):
driver = webdriver.Chrome()


def submit_new_bug():
    bug_title = driver.find_element("Title")
    tibug_titletle.send_keys("New Bug")

    bug_description = driver.find_element("Description")
    bug_description.send_keys("the description of the new bug")

    next_button = driver.find_element("Next")
    next_button.click()

    result_saved = driver.find_element("saved")
    assert(result_saved) === "Saved"

def cancel_bug_submission(): 
    cancel_button = driver.find_element("Cancel")
    cancel_button.click()

    result_cancelled = driver.find_element("Canceled Succesfully")
    assert(result_cancelled) === "Cancelled"
