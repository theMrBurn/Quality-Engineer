TODO: UPDATE FOR PLAYWRIGHT INSTRUCTIONS

---

## Automated Quality Assurance Test Repository

This is where all of the test automation created and maintained by the Software Quality Assurance team for Lithia Motors,internal development tools will live.

The purpose of this project and code Repository is to have an area outside of the Application code base where test engineers can add, edit, maintain and develop tools that will test variuous apps being developed for Litha Motors.

Currently, the applications or Projects being used by the test frameworks in this Repo are Allpay, and Performace Dashboard

Beyond this being a general Readme for the test Repository, it will also have technical onboarding instructions for any engineering team member that wishes to use these tools.

---

## Tools used by Software Quality Engineers

#TODO - update webdriver local install instructions
#TODO - update Postman / Newman local install instructions

---

## Webdriver.io

To Install the webdriverIO automation, clone this repo and run `npm i` in the `/wdio-test`, provided you have NPM on your local machine, it will download all of the necessary items according to the dependencies in the `package-lock.json` in `/wdio-test`

Additional help getting started can be found by visiting https://webdriver.io/docs/gettingstarted.html

---

to run the tests, navigate to `/wdio-test` in your terminal and run command `npx wdio run wdio.conf.js --spec`

Upon success, you should see Chrome launch, and run through the test steps

Upon completion, the tests should show output of the Spec reporter test results

I would recommend adding your own alias to your .bash or .zsh profile something like `alias runWidio="npx wdio run ./wdio.conf.js --spec"`
add one for each host you plan on using your local CLI to run.
