import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {NearEnvironment, NearEnvironmentProvider, NearProvider} from "react-near";
import {makeNearProviderState} from "react-near/NearProvider";
import createNearClient, {encodeRequest} from "react-near/core/client";
import {DEFAULT_CONNECTION_CONTRACT, FT_CONTRACT_METHODS} from "./config";
import {Contract} from "near-api-js";
import {Buffer} from "buffer";

window.Buffer = Buffer

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
