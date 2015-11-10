# node-pushy

[![npm version](https://badge.fury.io/js/node-pushy.svg)](https://badge.fury.io/js/node-pushy)

## A node wrapper for Pushy

More information on [Pushy](https://pushy.me).

## Installation

### NPM

`npm install node-pushy`

### Node

Add to package.json: `"pushy": "0.0.1"`.

## Usage

Requires:

- A pushy.me account
- An api key
- A list of android user tokens generated from the Pushy SDK

```javascript
// Create a pushy object
var pushy = require('node-pushy')(<api_key>);

// or
var pushy = require('node-pushy')();
pushy.setApiKey(<api_key>);

// Send push notifications
pushy
    .send({message: "You're a bouse!"}, [<userToken1>, <userToken2>])
    .then(function(statusCode){
        console.log('Success!');
    })
    .catch(function(error){
        console.log('Failed: ' + error.message);
    });
```
