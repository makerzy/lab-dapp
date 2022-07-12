import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { truncate_wallet } from "./utils";

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
const MintCardWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, 1fr);
grid-auto-rows: auto;
grid-gap: 2rem;
`
const MintCard = styled.div`
border: 2px solid #e7e7e7;
border-radius:1rem;
background: #fff;
height: 400px;
width: 320px;
  img{
    height: 70%;
    width:100%;
  }
`

const MintBtn = styled.button`
width: 80%;
height: 80px;
background-color: #1A4D2E;
color: #fff;
margin: 20px;
border: 2px;
border-radius:1rem;
font-weight: bold;
font-size:20px;
text-align: center;
cursor: pointer;
`

const DivWrapper = styled.div` 
display: flex;
align-items:center;
justify-content: center;
`


const Mint = () => {
  const injectedConnector = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42,], })
  const { chainId, account, activate, active, library } = useWeb3React()
  const onClick = () => {
    activate(injectedConnector)
  }

  const [hasMinted, setHasMinted] = useState(false)

  useEffect(() => {
    console.log({ chainId, account, active })
  }, [account, chainId, library]);

  return (
    <Container>
      <Header>
        {!account ?
          <Button onClick={onClick}>Connect</Button> :
          <AddressWrapper>{truncate_wallet(account)}</AddressWrapper>
        }
      </Header>
      <InnerContainer>
        <MintCardWrapper>
          <MintCard>
            <img src="https://ipfs.io/ipfs/QmWriuCxSBT8W1ksb48w8DUj1EyLK42xk1rtTKt4Wx5j7Y" alt="nft image" />
            <DivWrapper><MintBtn>Mint</MintBtn></DivWrapper>
          </MintCard>
          <MintCard>
            <img src="https://ipfs.io/ipfs/QmYxwcNRcw7oVQkjU2GTmU1qXpMnnDbduf5RqzDV2tPQAS" alt="nft image" />
            <DivWrapper><MintBtn>Mint</MintBtn></DivWrapper>
          </MintCard>
        </MintCardWrapper>
      </InnerContainer>
    </Container>
  )
}

export default Mint



