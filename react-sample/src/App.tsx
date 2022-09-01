import React from 'react';
import './App.css';
import {useNearAccount, useNearUser} from "react-near";
import {DEFAULT_CONNECTION_CONTRACT} from "./config";
import {useHasNft} from "near-access-react/dist";

function App() {
    const account = useNearAccount()
    const nearUser = useNearUser(DEFAULT_CONNECTION_CONTRACT)

    const connect = () => nearUser.connect("B'gok")
    const disconnect = () => nearUser.disconnect()

    const hasOneCowboyToken = useHasNft('cowboytest.mintspace2.testnet')
    const hasThreeCowboyTokens = useHasNft('cowboytest.mintspace2.testnet', {
        count: 3
    })
    const hasCowboyCaptainToken = useHasNft('cowboytest.mintspace2.testnet', {
        titleQuery: /Captain/
    })
    const hasParasToken = useHasNft('paras-token-v2.testnet')
    const hasGallopingGerty = useHasNft('paras-token-v2.testnet', {
        tokenIdQuery: /^1978:/
    })
    const hasSunAndSky = useHasNft('paras-token-v2.testnet', {
        tokenIdQuery: /^1940:/
    })
    const hasApollo11 = useHasNft('paras-token-v2.testnet', {
        titleQuery: /^Apollo 11 Mission/
    })
    const hasTwoApollo11 = useHasNft('paras-token-v2.testnet', {
        count: 2,
        titleQuery: /^Apollo 11 Mission/
    })

    return (
        <div className="App">
            <header className="App-header">
                <div>Sample app</div>
                <div>{account?.accountId ?
                    <>
                        <p>{account.accountId}</p>
                        <button onClick={disconnect}>Disconnect</button>
                    </>
                    :
                    <button onClick={connect}>Connect NEAR</button>}</div>
            </header>
            <section className='main-content'>
                <div>
                    {hasOneCowboyToken ?
                        <div className="unlocked gated-content">
                            You have unlocked this secret text with one cowboy token
                        </div>
                        :
                        <div className="locked gated-content">
                            You need at least 1 token from the <a
                            href='https://testnet.mintbase.io/store/cowboytest.mintspace2.testnet?tab=nfts&page=0'
                            rel="noreferrer"
                            target="_blank">cowboytest</a> collection to access this content
                        </div>
                    }
                    {hasThreeCowboyTokens ?
                        <div className="unlocked gated-content">
                            You have unlocked this secret text with three cowboy tokens
                        </div>
                        :
                        <div className="locked gated-content">
                            You need at least 3 tokens from the <a
                            href='https://testnet.mintbase.io/store/cowboytest.mintspace2.testnet?tab=nfts&page=0'
                            rel="noreferrer"
                            target="_blank">cowboytest</a> collection to access this content
                        </div>
                    }
                    {hasCowboyCaptainToken ?
                        <div className="unlocked gated-content">
                            You have unlocked this secret text with a captain cowboy.
                        </div>
                        :
                        <div className="locked gated-content">
                            You need at least 1 <a
                            href='https://testnet.mintbase.io/thing/C02lE_n7-7zp_spFBtbvsj5rRuPuRpOafM4w8Q5MCBU:cowboytest.mintspace2.testnet'
                            rel="noreferrer"
                            target="_blank">Captain Cowboy</a> token to access this content
                        </div>
                    }
                    {hasParasToken ?
                        <div className="unlocked gated-content">You have a Paras token</div>
                        :
                        <div className="locked gated-content">
                            You need at least 1 <a
                            href='https://testnet.paras.id/market'
                            rel="noreferrer"
                            target="_blank">paras</a> token to access this content
                        </div>
                    }
                    {hasGallopingGerty ?
                        <div className="unlocked gated-content">
                            Secret text unlocked by Galloping Gerty Token
                        </div>
                        :
                        <div className="locked gated-content">
                            You need at least 1 <a
                            href='https://testnet.paras.id/token/paras-token-v2.testnet::1978'
                            rel="noreferrer"
                            target="_blank">Galloping Gerty</a> token to access this content
                        </div>
                    }
                    {hasSunAndSky ?
                        <div className="unlocked gated-content">
                            Secret text unlocked by Sun & Sky Token
                        </div>
                        :
                        <div className="locked gated-content">
                            You need at least 1 <a
                            href='https://testnet.paras.id/token/paras-token-v2.testnet::1940'
                            rel="noreferrer"
                            target="_blank">Sun & Sky</a> token to access this content
                        </div>
                    }
                    {hasApollo11 ?
                        <div className="unlocked gated-content">
                            <p>Secret text unlocked by Apollo 11 Mission Token</p>
                            <i>
                                NOTE: Using the title as a way of validating a token in a shared collection that
                                you don't control isn't recommended since anyone can create a token with the a
                                title that matches the filter.
                            </i>
                        </div>
                        :
                        <div className="locked gated-content">
                            You need at least 1 <a
                            href='https://testnet.paras.id/token/paras-token-v2.testnet::2010'
                            rel="noreferrer"
                            target="_blank">Apollo 11 Mission</a> token to access this content
                        </div>
                    }
                    {hasTwoApollo11 ?
                        <div className="unlocked gated-content">Secret text unlocked by 2 Apollo 11 Mission Tokens</div>
                        :
                        <div className="locked gated-content">
                            You need at least 2 <a
                            href='https://testnet.paras.id/token/paras-token-v2.testnet::2010'
                            rel="noreferrer"
                            target="_blank">Apollo 11 Mission</a> tokens to access this content
                        </div>
                    }
                </div>
            </section>
        </div>
    );
}

export default App;
