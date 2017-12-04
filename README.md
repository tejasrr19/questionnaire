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

// Run the Python Rest Server
$ python server.py
```

Navigating to `http://localhost:5000` or `http://127.0.0.1:5000` should bring up the React App in the browser.

## Fixes to Backend server

1. The `/questions` endpoint returned only the last question instead of an array of questions. This is fixed by appending each item into the `output` array.

### Versions

Node - 8.1.4
NPM - 5.0.3
