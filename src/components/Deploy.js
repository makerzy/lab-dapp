import React from "react"
import styled from 'styled-components';
import { MintBtn } from "./Mint"
import { useWeb3React } from '@web3-react/core'
import { deploy, getUserNFT } from "../blockchain/index"

const InnerContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, 1fr);
grid-auto-rows: auto;
grid-gap: 2rem;
`
const MintCard = styled.div`
/* border: 2px solid #e7e7e7; */
border-radius:1rem;
background: transparent;
height: 400px;
width: 380px;
img{
    height: 70%;
    width:100%;
  }
`

const Deploy = ({ account, chainId, library }) => {
  const onClick = async() => {
    // console.log("Clicked...", account, chainId)
    await deploy(library.provider)
    const contract_address =await getUserNFT(account)
  }

  return (
    <MintCard>
      <MintBtn onClick={onClick} disabled={!account}>Deploy Contract</MintBtn>
    </MintCard>
  )
}

export default Deploy

