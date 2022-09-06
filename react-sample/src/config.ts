import {FT_METHODS} from "react-near/standards/ft/config";
import {STORAGE_METHODS} from "react-near/standards/storage/config";
// import {Buffer} from 'buffer';
import 'buffer';

// // @ts-ignore
// window.Buffer = Buffer;

export const DEFAULT_CONNECTION_CONTRACT = 'testnet'

export const FT_CONTRACT_METHODS = {
    viewMethods: [...FT_METHODS.viewMethods, ...STORAGE_METHODS.viewMethods],
    changeMethods: [...FT_METHODS.changeMethods, ...STORAGE_METHODS.changeMethods],
};
