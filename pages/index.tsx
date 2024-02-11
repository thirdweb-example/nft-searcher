import { ConnectWallet, useChain } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useEffect, useState, useCallback } from "react";
import { PoweredBy } from "../components/PoweredBy/PoweredBy";
import { GitHub } from "../components/PoweredBy/GitHub";
import NFTCard from "../components/NFTCard/NFTCard";
import Filter from "../components/Filter/Filter";
import NFTSearcher from "../components/NFTSearcher/NFTSearcher";

interface Attributes {
  [key: string]: string[];
}

const Home: NextPage = () => {
      const [fetchedNFTs, setFetchedNFTs] = useState<any[]>([]);
      const [loading, setLoading] = useState<boolean>(false);
      const [attributes, setAttributes] = useState<Attributes>({});
      const [allNFTs, setAllNFTs] = useState<any[]>([]);
      const chain = useChain();
      const [network, setNetwork] = useState<string>("ethereum");
    
      // Set network for NFTSearcher based on chain. This is an example that allows you to switch networks with your wallet login to see the network icon change.
      // It is not necessary to use this in your dApp.
      // It is suggested to set this to what you dApp activeChain is set to in `_app.tsx`.
      useEffect(() => {
        if (chain && chain.chain.toLowerCase() === "eth" && chain.slug === "eth") {
          setNetwork("ethereum");
        } else if (chain && chain.chain.toLowerCase() === "polygon") {
          setNetwork("polygon");
        } else if (chain && chain.chain.toLowerCase() === "avax") {
          setNetwork("avalanche");
        } else if (chain && chain.chain.toLowerCase() === "ftm") {
          setNetwork("fantom");
        } else if (chain && chain.slug === "frame-testnet") {
          setNetwork("frame-testnet");
        }
      }, [chain]);
    
      console.log(fetchedNFTs)
    
      const extractAttributes = useCallback((nfts: any[]) => {
        const attributeMap: Attributes = {};
        nfts.forEach(nft => {
          if (nft.metadata && nft.metadata.attributes) {
            nft.metadata.attributes.forEach((attribute: any) => {
              if (!attributeMap[attribute.trait_type]) {
                attributeMap[attribute.trait_type] = [];
              }
    
              if (!attributeMap[attribute.trait_type].includes(attribute.value)) {
                attributeMap[attribute.trait_type].push(attribute.value);
              }
            });
           } else if (nft.attributes) {
              Object.entries(nft.attributes || {}).forEach(([key, value]) => {
                if (!attributeMap[key]) {
                  attributeMap[key] = [];
                }
    
                if (typeof value === 'string' && !attributeMap[key].includes(String(value))) {
                  attributeMap[key].push(value);
                }
              });
            }
          });
    
        return attributeMap;
      }, []);
    
      // handle fetched NFTs
      const handleNFTsFetched = useCallback((nfts: any[]) => {
        setLoading(true);
        setFetchedNFTs(nfts);
        setAllNFTs(nfts);
        const attributes = extractAttributes(nfts);
        setAttributes(attributes);
        setLoading(false);
    }, [setLoading, setFetchedNFTs, setAllNFTs, setAttributes, extractAttributes]);
    
    
      // search params
      const [limit, setLimit] = useState<number>(100);
      const [start, setStart] = useState<number>(0);
    
      // handle search params from card selection
      const handleAttributeFromCard = async (selectedAttribute:string, tokenStart:number) => {
        setStart(tokenStart);
          const updateNFTs = fetchedNFTs.filter((nft) => {
            if (nft.metadata && nft.metadata.attributes) {   
              return nft.metadata.attributes.some((attribute: any) => {
                return selectedAttribute.includes(attribute.trait_type) && selectedAttribute.includes(attribute.value);
              });
            }
          });
          setFetchedNFTs(updateNFTs);
      }
    
      const handleClearSearch = () => {
        const clear = "";
        handleAttributeFromCard(clear, 0);
        setFetchedNFTs(allNFTs);
      }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{textAlign: 'right', marginTop: '10px'}}>
          <ConnectWallet />
        </div>
        <h4 className={styles.title} style={{textAlign: 'center'}}>
          An NFT Search Bar
        </h4>
          <div style={{textAlign: 'center'}}>
            <NFTSearcher 
            activeNetwork={network}
            theme={"light"} // "light" or "dark"
            onNFTsFetched={handleNFTsFetched}
            limit={limit}
            start={start}
            />
          </div>
          <div className={styles.selectorContainer}>
              <Filter attributes={attributes} onAttributeSelect={handleAttributeFromCard}></Filter>
              <p className={styles.instructions}>&larr; filter by token and trait or reset trait selection &rarr;</p>
              <div className={styles.selection}>
                  <button className={styles.resetBtn} onClick={handleClearSearch}><Image src="/images/reset.png" width={22} height={22} alt="reset"/></button>
              </div> 
            </div>
            <div className={styles.gridContainer}>
              <div className={styles.grid}>
                {fetchedNFTs.length === 0 ? (
                    <p>No NFTs fetched yet...</p>
                ) : fetchedNFTs && fetchedNFTs.length > 0 ? (
                    fetchedNFTs.map((nft, i) => (
                        <NFTCard 
                        nft={nft} 
                        key={i} 
                        network={network} 
                        tokenStart={start}
                        onAttributeSelect={handleAttributeFromCard}
                        ></NFTCard>
                    ))
                ) : ( <div style={{ marginLeft: "auto", marginRight: "auto", }}>Loading...</div>)}
              </div>
            </div>
          </div>
      <PoweredBy />
      <GitHub />
    </main>
  );
};

export default Home;
