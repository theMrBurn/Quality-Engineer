# Quality-Engineer
the Automation directory contains updated examples of Test Automation Framework

To Install the webdriverIO automation, clone this repo and run `npm i` in the `/wdio-test`, provided you have NPM on your local machine, it will download all of the necessary items according to the dependencies in the `package-lock.json` in `/wdio-test`

Additional help getting started can be found by visiting https://webdriver.io/docs/gettingstarted.html

_______

to run the tests, navigate to `/wdio-test` in your terminal and run command `./node_modules/.bin/wdio --spec`

Upon success, you should see Chrome launch, and run through the test steps

Upon completion, the tests should show output of the Spec reporter test results


_______

Postman regression testing

Under the Automation directory is a Postman collection I created to do automated regression testing against an API that handled smart home technology and outside vendor hardware
If imported in to your Postman IDE, it will not run, because you would need the global and environmental variable `.json` files necessary to retrieve authentecation. This is meant to be an example of how I would fully automate API testing for continous regression against new feature branches. 

In practice this was part of a docker build and deploy job in CircleCI against Dev and Staging envionments using Newman, as well as against locally spun up instances for more robust functional testing and test case development. It could also be ran at-will against any of those environments via Newman in your local terminal.