import {useNearAccount, useNearContract} from "react-near";
import {FT_METHODS} from "react-near/standards/ft/config";
import {STORAGE_METHODS} from "react-near/standards/storage/config";
import {Buffer} from 'buffer';
import {useNftTokensForOwner} from "react-near/standards";

// @ts-ignore
window.Buffer = Buffer;

export const DEFAULT_CONNECTION_CONTRACT = 'testnet'

export const FT_CONTRACT_METHODS = {
    viewMethods: [...FT_METHODS.viewMethods, ...STORAGE_METHODS.viewMethods],
    changeMethods: [...FT_METHODS.changeMethods, ...STORAGE_METHODS.changeMethods],
};

interface IHasNftQuery {
    count?: number,
    titleQuery?: RegExp,
    tokenIdQuery?: RegExp
}

export function useHasNft(contractName: string, query: IHasNftQuery = {}): boolean {
    const {count, tokenIdQuery, titleQuery} = {count: 1, ...query}
    const account = useNearAccount()
    const nftContract = useNearContract(contractName, {
        viewMethods: ['nft_tokens_for_owner', 'nft_metadata', 'nft_tokens'],
        changeMethods: [],
    })
    const {
        data: collection,
    } = useNftTokensForOwner({
        contract: nftContract,
        variables: {account_id: account?.accountId || '', limit: 99, fromIndex: 0},
        poolInterval: 1000 * 10,
    })
    const selected = collection?.filter(t => {
        if (titleQuery) {
            if (t.metadata?.title) {
                return t.metadata?.title?.search(titleQuery) !== -1
            } else {
                return false
            }
        } else {
            return true
        }
    }).filter(t => {
        if (tokenIdQuery) {
            if (t.token_id) {
                return t.token_id.search(tokenIdQuery) !== -1
            } else {
                return false
            }
        } else {
            return true
        }
    })
    // @ts-ignore
    return selected ? selected.length >= count : false
}


