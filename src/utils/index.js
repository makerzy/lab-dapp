export function truncate_wallet(wallet) {
  return `${wallet.substring(0, 5)}...${wallet.substring(wallet?.length - 5, wallet?.length)}`.toUpperCase()
}



export const mint_data = ([
  {
    token_id: "7433",
    token_uri: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/7433",
    to: "",
    nonce: "",
    r: "",
    s: "",
    v: "",
  },
  {
    token_id: "7429",
    token_uri: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/7429",
    to: "",
    nonce: "",
    r: "",
    s: "",
    v: "",
  },
])