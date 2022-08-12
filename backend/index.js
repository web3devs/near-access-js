const express = require('express')
const app = express()
const nearAPI = require("near-api-js");
const {Contract} = require("near-api-js");
const {connect, keyStores} = nearAPI;
const cors = require('cors')
const ed = require('@noble/ed25519')
const bodyParser = require('body-parser');
const {binary_to_base58} = require('base58-js')


app.use(cors())
app.use(bodyParser.json());

console.log()
const keyStore = new keyStores.InMemoryKeyStore();

async function verifySignature(signature, publicKey) {
    const message = Buffer.from("hi");
    return await ed.verify(signature, message, publicKey);
}


app.post('/', async (req, res) => {
    try {
        const {tokenId, contractAddress, signature, publicKey, requesterAccountId} = req.body
        const publicKeyFromHex = Buffer.from(publicKey, 'hex')
        const decodedPublicKEy = binary_to_base58(publicKeyFromHex)


        const accessKeysResponse = await fetch('https://rpc.testnet.near.org', {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": "dontcare",
                "method": "query",
                "params": {
                    "request_type": "view_access_key_list",
                    "finality": "final",
                    "account_id": requesterAccountId
                }
            })
        })

        let accessKeys = await accessKeysResponse.json()
        accessKeys = accessKeys.result.keys.map(k => k.public_key.split(':')[1])
        if (accessKeys.indexOf(decodedPublicKEy) === -1) {
            res.status(403)
            res.send("Keys does not match. Access denied")
        }
        const connectionConfig = {
            networkId: "testnet",
            keyStore,
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        };


        const nearConnection = await connect(connectionConfig);
        const account = await nearConnection.account("");
        try {

            if (await verifySignature(signature, publicKey)) {
                const contract = new Contract(account, contractAddress, {
                    viewMethods: ["nft_token"],
                    changeMethods: []
                })

                const response = await contract.nft_token({token_id: tokenId.toString()})

                if (response.owner_id === requesterAccountId) {
                    res.send(response)
                } else {
                    res.status(403)
                    res.send(`Token does not belong to you, it belongs to ${response.owner_id}`)
                }

            } else {
                res.status(403)
                res.send("Invaid signature")
            }

        } catch (error) {
            console.error(error)
            res.status(500)
            res.send("Error")
        }
    } catch (error) {
        res.status(500)
        res.send("Error")
    }
})

app.listen(3000)
