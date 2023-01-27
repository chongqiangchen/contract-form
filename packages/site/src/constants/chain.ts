import {Chain} from "wagmi";

type ChainName =
    | 'bsc'
    | 'bscTestnet'
    | 'eth'
    | 'arb'
    | 'optimism'


export const ChainMap: Record<ChainName, Chain> = {
    eth: {
        id: 1,
        name: 'Ethereum',
        nativeCurrency: {name: 'ETH', symbol: 'ETH', decimals: 18},
        rpcUrls: {
            other: 'https://eth-rpc.gateway.pokt.network',
            default: 'https://eth-mainnet.g.alchemy.com/v2/-x5fEf6Fmg6nFI2FJH992NLRl68lYFS4',
        },
        blockExplorers: {
            etherscan: {
                name: 'Etherscan',
                url: 'https://etherscan.io',
            },
            default: {
                name: 'Etherscan',
                url: 'https://etherscan.io',
            }
        },
    },
    arb: {
        id: 42161,
        name: 'Arbitrum',
        nativeCurrency: {name: 'ETH', symbol: 'ETH', decimals: 18},
        rpcUrls: {
            other: 'https://endpoints.omniatech.io/v1/arbitrum/one/public',
            default: 'https://arb-mainnet.g.alchemy.com/v2/EnoE-Wj7Zkz8FTiFSZsQkhy15GtEeJJD',
        },
        blockExplorers: {
            etherscan: {
                name: 'Arbiscan',
                url: 'https://arbiscan.io',
            },
            default: {
                name: 'Arbiscan',
                url: 'https://arbiscan.io',
            }
        }
    },
    optimism: {
        id: 10,
        name: 'Optimism',
        nativeCurrency: {name: 'ETH', symbol: 'ETH', decimals: 18},
        rpcUrls: {
            other: 'https://1rpc.io/op',
            default: 'https://mainnet.optimism.io',
        },
        blockExplorers: {
            etherscan: {
                name: 'Optimism',
                url: 'https://optimistic.etherscan.io',
            },
            default: {
                name: 'Optimism',
                url: 'https://optimistic.etherscan.io',
            }
        }
    },
    bsc: {
        id: 56,
        name: 'BSC',
        nativeCurrency: {name: 'BNB', symbol: 'BNB', decimals: 18},
        rpcUrls: {
            dataseed1: 'https://bsc-dataseed1.binance.org',
            dataseed2: 'https://bsc-dataseed2.binance.org',
            default: 'https://bsc-dataseed1.binance.org'
        },
        blockExplorers: {
            etherscan: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            },
            bscscan: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            },
            default: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            }
        },
    },
    bscTestnet: {
        id: 97,
        name: 'Testnet BSC',
        nativeCurrency: {name: "TBNB", symbol: "TBNB", decimals: 18},
        rpcUrls: {
            default: "https://data-seed-prebsc-1-s1.binance.org:8545",
        },
        blockExplorers: {
            etherscan: {
                name: "Testnet Bscscan",
                url: "https://testnet.bscscan.com/"
            },
            default: {
                name: "Testnet Bscscan",
                url: "https://testnet.bscscan.com/"
            }
        },
    }
}

export const Chains: Chain[] = [
    ChainMap.eth,
    ChainMap.arb,
    ChainMap.optimism,
    ChainMap.bsc,
    ChainMap.bscTestnet
]