# Simple Questionnaire

This simple questionnaire is built on React and Webpack, with a backend python server acting as a REST API.

## Setup and Installation

```
$ git clone https://github.com/tejasrr19/questionnaire.git
$ cd questionnaire

// install dependencies
$ npm install

// Build the React Application
$ npm run dev-build

// Add Python dependencies
pip install -r requirements.txt

// Run the Python Rest Server
$ python server.py
```

Navigating to `http://localhost:5000` or `http://127.0.0.1:5000` should bring up the React App in the browser.

## Fixes to Backend server

1. The `/questions` endpoint returned only the last question instead of an array of questions. This is fixed by appending each item into the `output` array.

2. Handled Flask requests concurrently by setting `app.run(debug=True, threaded=True)`.

### Versions

Node - 8.1.4
NPM - 5.0.3
pip - 9.0.1
Python - 2.7.13

## Troubleshooting

Cache busting is not implemented. The browser cache stores the bundled files and if there are changes to the React source files, they are not displayed in the browser unless a hard refresh is performed.

### Hard Refresh

In Windows/Linux, Hold down Ctrl and click the Reload button.
In Mac, Hold ⇧ Shift and click the Reload button.

## TODO

1. Implement cache busting, so as to serve a new bundle every time there are file changes.

2. Dockerize the app.
