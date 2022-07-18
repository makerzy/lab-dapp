import React, { useState, useEffect } from "react"
import {constants} from "ethers"
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { truncate_wallet } from "../utils";
import Mint from "../components/Mint"
import Deploy from "../components/Deploy"
import ModalComponent from "../components/Modal"
import { getUserNFTAddress } from "../blockchain/index"

const Container = styled.div`
  background: url('famu-flame.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  background-position: left top;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 100px;
`
const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  flex: 1;
`
const Button = styled.button`
  box-shadow:inset 0px 1px 0px 0px #fce2c1;
	background:linear-gradient(to bottom, #F4811F 5%, #fb9e25 100%);
	background-color:#F4811F;
	border-radius:11px;
	border:2px solid #eeb44f;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:16px;
	font-weight:bold;
	padding:8px 18px;
	text-decoration:none;
	text-shadow:0px 1px 0px #cc9f52;
  margin: 20px;
  &:hover{
    background:linear-gradient(to bottom, #fb9e25 5%, #F4811F 100%);
	  background-color:#fb9e25;
  }
  &:active{
    position:relative;
	  top:1px;
  }
`
const AddressWrapper = styled.div`
  cursor:pointer;
  font-size:16px;
	font-weight:bold;
	padding:8px 18px;
	text-decoration:none;
  &:hover{
    font-size:20px;
    font-size-adjust: 20px;
  }
`


const Main = () => {

  const injectedConnector = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42,], })
  const { chainId, account, activate, active, library } = useWeb3React()
  const onClick = () => {
    activate(injectedConnector)
  }

  const [deployedAddress, setDeployedAddress] = useState(null)
  const [state, setState] = useState(false)
  const [hasMinted, setHasMinted] = useState(false)
  useEffect(() => {

    const getUserNftAddress = async () => {
      const addr = await getUserNFTAddress(library.provider, account)
      setDeployedAddress(addr === constants.AddressZero? null : addr)
    }

    getUserNftAddress().catch(console.error)

    return () => {
      setState(true);
    };
  }, [deployedAddress, account, chainId, library]);
  return (
    <Container>
      <Header>
        {!account ?
          <Button onClick={onClick}>Connect</Button> :
          <AddressWrapper>{truncate_wallet(account)}</AddressWrapper>
        }
      </Header>
      <InnerContainer>
        {!deployedAddress ? 
        <Deploy {...{ account, chainId, library }} /> : 
        <Mint {...{ account, chainId, library }} />
        }

      </InnerContainer>
    </Container>
  )
}




export default Main