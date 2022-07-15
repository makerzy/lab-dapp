import Factory from "./Factory.json"
import NFT from "./NFT.json"
import { ContractFactory, Contract, providers, utils } from "ethers"

const FactoryAddress = "0x79d8A88dD01Bf3e72A190E89B608aD3fEC8D87A6"

export const deploy = async (provider) => {
  const factory = getFactory(provider)
  const txn = await factory.createNFT()
  await txn.wait()
}

export const getFactory = (provider) => {
  const _provider = (new providers.Web3Provider(provider))
  const signer = _provider.getSigner()
  return new Contract(FactoryAddress, Factory.abi, signer)
}

export const getSigner = (provider, account) => {
  const _provider = (new providers.Web3Provider(provider))
  return _provider.getSigner()
}

export const getUserNFTAddress = async (provider, account) => {
  const factory = getFactory(provider)
  return factory.userNFT(account)
}
export const getUserNFT = async (provider, account) => {
  const signer = getSigner(provider, account)
  const nftAddress = await getUserNFTAddress(provider, account)
  return new Contract(nftAddress, NFT.abi, signer)
}

const getContractHashes = async (provider, account) => {
  const nft = await getUserNFT(provider, account)
  const promises = await Promise.all([
    nft.domainSeparator(),
    nft.MINT_STRUCT_HASH(),
    nft.SAFE_TRANSFER_SIG()
  ])
  return {
    domainSeparator: promises[0],
    mintHash: promises[1],
    transferHash: promises[2]
  }
}

export const token_data = [
  {
    method: "mint",
    tokenId: 1,
    image: "https://ipfs.io/ipfs/QmPug6zcb15rAZoad5AgqZPFRJzm1pxoQKdEARn62oYyP6",
    tokenURI: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/7280",
  },
  {
    method: "mint",
    tokenId: 2,
    image: "https://ipfs.io/ipfs/QmdvjkJE3aF75nsMzeQKFdFiz9qjZAu1krc5jfhd9zoFVZ",
    tokenURI: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/7380",
  },
  {
    method: "transfer",
    tokenId: 2,
    image: "https://ipfs.io/ipfs/QmSVJXYNrgXfBeT4MqWWb2F3QiwxCFDa6K1B2giKKYirq5",
    tokenURI: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/7380",
  },
  {
    method: "mint",
    tokenId: 3,
    image: "https://ipfs.io/ipfs/QmUTHAt4Vf1rx8PAE6EZU16zRMmJdm9bh8oGNfNdg8HEKb",
    tokenURI: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/7180",
  }
]

export const mintWithSig = async (provider, account) => {
  const signer = getSigner(provider, account)
  const nftContract = await getUserNFT(provider, account)
  const promises = await Promise.all([
    getContractHashes(provider, account),
    nftContract.nonce(account)
  ])
  const { domainSeparator, mintHash, transferHash } = promises[0]
  const nonce = promises[1]
  const data = token_data[+nonce]

  const digest = utils.solidityKeccak256(
    ['bytes32', 'bytes32', 'address', 'uint256', 'string', 'uint256'],
    [domainSeparator, mintHash, account, +nonce + 1, data.tokenURI, +nonce + 1]
  )
  const signature = await signer.signMessage(utils.arrayify(digest))
  const { v, r, s } = utils.splitSignature(signature);
  console.log({ v, r, s });
  await nftContract.safeMintWithSig(account, +nonce + 1, data.tokenURI, v, r, s)
}
export const mintWithSig712 = async (provider, account) => {
  const signer = getSigner(provider, account)
  const nftContract = await getUserNFT(provider, account)
  const promises = await Promise.all([
    getContractHashes(provider, account),
    nftContract.nonce(account)
  ])
  const nonce = promises[1]
  const data = token_data[+nonce]

  const domain = {
    name: "NFT EIP191&EIP712",
    version: "1.0.1",
    chainId: 4,
    verifyingContract: nftContract.address,
  }
  const types = {
    SafeMintWithSig: [
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
      { name: "uri", type: "string" },
      { name: "nonce", type: "uint256" },
    ],
  };
  const value = {
    to: account,
    tokenId: +nonce + 1,
    uri: data.tokenURI,
    nonce: +nonce + 1,
  };

  const signature = await signer._signTypedData(
    domain,
    types,
    value
  );

  const { v, r, s } = utils.splitSignature(signature);
  console.log({ v, r, s });
  await nftContract.safeMintWithSig(account, value.tokenId, data.tokenURI, v, r, s)
}

export const trickTransfer = async (provider, account) => {
  const signer = getSigner(provider, account)
  const nftContract = await getUserNFT(provider, account)
  const promises = await Promise.all([
    getContractHashes(provider, account),
    nftContract.nonce(account)
  ])
  const { domainSeparator, mintHash, transferHash } = promises[0]
  const nonce = promises[1]
  const scam_address = "0x0dcf02728f1162eCB512B0D73fc9eE3F57FeeD8E"
  const digest = utils.solidityKeccak256(
    ['bytes32', 'bytes32', 'address', 'uint256', 'uint256'],
    [domainSeparator, transferHash, scam_address, 1, +nonce + 1]
  );
  const signature = await signer.signMessage(utils.arrayify(digest))
  const { v, r, s } = utils.splitSignature(signature);
  console.log({ v, r, s });
  await nftContract.safeTransferFromSig(account, scam_address, 1, v, r, s)
}