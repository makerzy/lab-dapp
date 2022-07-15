import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import { token_data } from "../blockchain/index"
import { mintWithSig, trickTransfer, mintWithSig712 } from "../blockchain/index"
import ModalComponent from "./Modal"

const MintCardWrapper = styled.div`
/* width: 100%;
height:100%; */
display: grid;
grid-template-columns: repeat(2, 1fr);
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

export const MintBtn = styled.button`
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


const Mint = ({ account, chainId, library }) => {


  const [deployedAddress, setDeployedAddress] = useState(null)
  const [displayModal, setDisplayModal] = useState(false)
  const methods = [mintWithSig712, mintWithSig, trickTransfer, mintWithSig]
  useEffect(() => {
    console.log({ chainId, account })
    // const addressInStorage= localStorage.getItem('deployedAddress');
    // if(!deployedAddress){

    //   addressInStorage.setItem('deployedAddress', deployedAddress);
    // }else setDeployedAddress(addressInStorage)

  }, [deployedAddress, account, chainId, library]);
  const onClick = async (i) => {
    await methods[i](library.provider, account)
    if (token_data[i].method === 'transfer')
      setDisplayModal(true)
  }

  return (

    <MintCardWrapper>

      {token_data.map((token, i) => (
        <MintCard>
          <img src={token.image} alt="nft image" />
          <DivWrapper><MintBtn onClick={() => onClick(i)}>Mint</MintBtn></DivWrapper>
        </MintCard>
      ))}
      {displayModal && <ModalComponent {...{ action: setDisplayModal }} />}
    </MintCardWrapper>
  )
}

export default Mint



