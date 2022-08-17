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

To run both `frontend` and `lib`:

```
cd lib

yarn link
```

Then open `frontend` directory and run:
```
yarn link 'near-access-js'
```


### Running

`yarn`

`yarn dev`
