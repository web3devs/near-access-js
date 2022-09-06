# near-access-react

## Basic Usage
1. Install the module and its peer dependencies.
`yarn add @types/react react react-near near-api-js near-access-react`
2. Add the near providers to the root of your dom. The `index.tsx` is a good place to do this. 
```javascript
const initializeState = async () => {
    const nearState = await makeNearProviderState({ environment: NearEnvironment.TestNet });
    const nearClient = createNearClient();

    const defaultConnectionAccount = await nearState.near.account(DEFAULT_CONNECTION_CONTRACT);
    const defaultConnectionContract = new Contract(defaultConnectionAccount, DEFAULT_CONNECTION_CONTRACT, FT_CONTRACT_METHODS);

    nearClient.setContract(encodeRequest(DEFAULT_CONNECTION_CONTRACT), defaultConnectionContract);

    root.render(
        <React.StrictMode>
            <NearEnvironmentProvider defaultEnvironment={NearEnvironment.TestNet}>
                <NearProvider defaultState={nearState} defaultClient={nearClient}>
                    <App/>
                </NearProvider>
            </NearEnvironmentProvider>
        </React.StrictMode>
    );
}

initializeState()
```
3. Set up a component that the user can connect their near wallet to your dapp.
```javascript
function ConnectToNearWallet() {
    const account = useNearAccount()
    const nearUser = useNearUser(DEFAULT_CONNECTION_CONTRACT)

    const connect = () => nearUser.connect("B'gok")
    const disconnect = () => nearUser.disconnect()

    return
    <div>{account?.accountId ?
        <>
            <p>{account.accountId}</p>
            <button onClick={disconnect}>Disconnect</button>
        </>
        :
        <button onClick={connect}>Connect</button>}
    </div>
}
```
4. Now you are able to set up a component that can check for ownership of an NFT.
```javascript
function ShowNftOwnership() {
    const hasOneCowboyToken = useHasNft('cowboytest.mintspace2.testnet')
    const hasThreeCowboyTokens = useHasNft('cowboytest.mintspace2.testnet', {
        count: 3
    })
    const hasApollo11 = useHasNft('paras-token-v2.testnet', {
        titleQuery: /^Apollo 11 Mission/
    })
    const hasGallopingGerty = useHasNft('paras-token-v2.testnet', {
        tokenIdQuery: /^1978:/
    })
    return
        <div>
            <div>
                Has cowboy token? {hasOneCowboyToken}
                {!hasOneCowboyToken && 
                    <a
                        href='https://testnet.mintbase.io/store/cowboytest.mintspace2.testnet?tab=nfts&page=0'
                        rel="noreferrer"
                        target="_blank">Get one</a>
                }
            </div>
            <div>
                Has three cowboy tokens? {hasThreeCowboyTokens}
                {!hasThreeCowboyTokens &&
                    <a
                        href='https://testnet.mintbase.io/store/cowboytest.mintspace2.testnet?tab=nfts&page=0'
                        rel="noreferrer"
                        target="_blank">Get them</a>
                }
            </div>
            <div>
                Has Apollo 11 Mission Token? {hasApollo11}
                {!hasApollo11 &&
                    <a
                        href='https://testnet.paras.id/token/paras-token-v2.testnet::2010'
                        rel="noreferrer"
                        target="_blank">Get one</a>
                }
            </div>
            <div>
                Has Galloping Gerty token? {hasGallopingGerty}
                {!hasGallopingGerty &&
                    <a
                        href='https://testnet.paras.id/token/paras-token-v2.testnet::1978'
                        rel="noreferrer"
                        target="_blank">Get one</a>
                    }
            </div>
        </div>
}
```