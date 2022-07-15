import logo from './logo.svg';
import './App.css';
import Main from "./pages/Main"

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}


function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    <Main />
    </Web3ReactProvider>
  );
}

export default App;
