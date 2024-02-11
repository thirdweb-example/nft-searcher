import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Ethereum, Polygon, Fantom, Avalanche, FrameTestnet } from "@thirdweb-dev/chains"; // Import the chain you want to use

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// activeChain options: "ethereum", "polygon", "fantom", "avalanche", "frame-testnet"
const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      activeChain={activeChain}
      supportedChains={[Ethereum, Polygon, Fantom, Avalanche, FrameTestnet]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
