# NEAR ACCESS

## Backend

Application in node.js with single endpoint that verifies signature and ownership of provided nft tokens.

Default port is 3000.
### Running

`yarn install`

`yarn dev`

## Frontend

Small Vue.js application that connects to the NEAR wallet and sends to the backend signature and public key to be
verification

### **Configuration**

in [config.js](frontend/src/config.js) you need to provide contract name which is you testnet wallet address

`const CONTRACT_NAME = "YOUR_NAME.testnet"; /* TODO: fill this in! */`

### Running

`yarn install`

`yarn dev`
