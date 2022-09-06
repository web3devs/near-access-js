import {useNearAccount, useNearContract} from "react-near";
import {useNftTokensForOwner} from "react-near/standards";

interface IHasNftQuery {
    count?: number,
    titleQuery?: RegExp,
    tokenIdQuery?: RegExp
}

const titleQueryFilter = (query?: RegExp) => (
    (t: any): boolean => {
        if (query) {
            if (t.metadata?.title) {
                return t.metadata?.title?.search(query) !== -1
            } else {
                return false
            }
        } else {
            return true
        }
    }
)

const tokenIdQueryFilter = (query?: RegExp) => (
    (t: any): boolean => {
        if (query) {
            if (t.token_id) {
                return t.token_id.search(query) !== -1
            } else {
                return false
            }
        } else {
            return true
        }
    }
)

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
    const selected = collection?.filter(titleQueryFilter(titleQuery)).filter(tokenIdQueryFilter(tokenIdQuery))

    // @ts-ignore
    return selected ? selected.length >= count : false
}
