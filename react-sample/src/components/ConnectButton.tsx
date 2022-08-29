// import React, {useEffect, useState} from 'react'
// import {connect, ConnectConfig, keyStores, Near, WalletConnection} from "near-api-js"
//
// export const ConnectButton = () => {
//     const [nearConnection, setNearConnection] = useState<Near>()
//     useEffect(() => {
//         const connectionConfig: ConnectConfig = {
//             headers: {},
//             networkId: "testnet",
//             keyStore: new keyStores.BrowserLocalStorageKeyStore(),
//             nodeUrl: "https://rpc.testnet.near.org",
//             walletUrl: "https://wallet.testnet.near.org",
//             helperUrl: "https://helper.testnet.near.org",
//             // explorerUrl: "https://explorer.testnet.near.org",
//         };
//         connect(connectionConfig).then(setNearConnection)
//     })
//
//     const nearConnect = async () => {
//     }
//
//     const connectToWallet = () => {
//         const walletConnection = new WalletConnection(nearConnection);
//     }
//
//     return <button onClick={nearConnect}>connect</button>
// }
export {}