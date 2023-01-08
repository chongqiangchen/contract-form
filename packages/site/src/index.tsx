import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App'
import theme from './theme';
import { chain, createClient, defaultChains, WagmiProvider } from 'wagmi';
import { Chains } from './constants/chain';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import LogsProvider from './components/LogsProvider';
import React from 'react';

const chains = defaultChains
const defaultChain = chain.mainnet

const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = Chains.find((x) => x.id === chainId) ?? defaultChain;
    const rpcUrl = chain.rpcUrls.default;
    return [
      new MetaMaskConnector({ chains: Chains }),
      new CoinbaseWalletConnector({
        chains: Chains,
        options: {
          appName: 'wagmi',
          chainId: chain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains: Chains,
        options: {
          qrcode: true,
          rpc: { [chain.id]: rpcUrl },
        },
      }),
      new InjectedConnector({ chains, options: { name: 'Injected' } }),
    ]
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiProvider client={client}>
    <ThemeProvider theme={theme}>
      <LogsProvider>
        <CssBaseline />
        <App />
      </LogsProvider>
    </ThemeProvider>
  </WagmiProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
