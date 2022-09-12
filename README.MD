# NEAR ACCESS

## Backend

Application in node.js with single endpoint that verifies signature and ownership of nft tokens based on the minting contract. As long as the NFT addresses match and you gain access based on the verified signature. 

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
