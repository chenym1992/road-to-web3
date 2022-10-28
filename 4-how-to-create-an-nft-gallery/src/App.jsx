import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const api_key = "2jWB18RyJu_uplAQnYKCgCNdoD8q1dPI";
const requestOptions = {
  method: "GET",
};
const GlobalStyle = createGlobalStyle`
  html,body {
    margin: 0;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  height: 100vh;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 100px 20px;
`;

const Input = styled.input`
  padding: 12px 24px;
  border-radius: 8px;
  border: 0;
  width: ${(props) => (props.type === "checkbox" ? "auto" : "300px")};
  margin-top: 16px;
  outline: none;
  background-color: aliceblue;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;
function NFTCard({ nft }) {
  return (
    <div className="w-1/4 flex flex-col ">
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {nft.id.tokenId}</p>
          <p className="text-gray-600">{nft.contract.address}</p>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
        </div>
      </div>
    </div>
  );
}
function App() {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [checked, setChecked] = useState(false);

  const fetchNFTs = async () => {
    if (!wallet.length) return;
    let nfts;
    console.log("fetching nfts");
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <FlexWrapper>
          <Input
            onChange={(e) => {
              setWalletAddress(e.target.value);
            }}
            value={wallet}
            type={"text"}
            placeholder="Add your wallet address"
          ></Input>
          <Input
            onChange={(e) => {
              setCollectionAddress(e.target.value);
            }}
            value={collection}
            type={"text"}
            placeholder="Add the collection address"
          ></Input>
          <label style={{ color: "#666666" }}>
            <Input
              onChange={(e) => setChecked(e.target.checked)}
              value={checked}
              type={"checkbox"}
            ></Input>
            Fetch for collection
          </label>
          <Button
            onClick={() => {
              checked ? fetchNFTsForCollection() : fetchNFTs();
            }}
          >
            Let's go!
          </Button>
        </FlexWrapper>
        <FlexWrapper>
          {NFTs?.map((nft,idx) => {
            return <NFTCard key={idx} nft={nft}></NFTCard>;
          })}
        </FlexWrapper>
      </Wrapper>
    </>
  );
}

export default App;
