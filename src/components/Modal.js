import React from 'react'
import styled from 'styled-components'

const Container = styled.div` 
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

const Center = styled.div` 
position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Modal = styled.div` 
  width: 250px;
  height: 170px;
  background: white;
  color: white;
  z-index: 10;
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
`

const ModalHeader = styled.div` 
  height: 50px;
  background: white;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  h4{
    margin: 0;
  padding: 10px;
  color: #2c3e50;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  }
`
const ModalContent = styled.div` 
padding: 10px;
  font-size: 16px;
  font-weight : 600;
  color: #2c3e50;
  text-align: center;
`



const Btn = styled.button` 
  cursor: pointer;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  color: #2c3e50;
  background: white;
  transition: all 0.25s ease;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  position: absolute;
  right: 0;
  top: 0;
  align-self: flex-end;
  margin-top: -7px;
  margin-right: -7px;
  &:hover{
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    transform: translate(-4px, 4px);
  }
`


const ModalComponent = ({ action }) => {
  return (
    <Container>
      <Center>
        <Modal>
          <ModalHeader><h4>Oh no!</h4></ModalHeader>
          <Btn onClick={() => action(false)}>x</Btn>
          <ModalContent>
            You've been scammed!
            You have successfully transfered your precious NFT to scammer.
          </ModalContent>
        </Modal>
      </Center>
    </Container >
  )
}

export default ModalComponent