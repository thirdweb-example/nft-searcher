# nft-searcher

# NFTSearcher Component

This is a standalone component that can be used to search for NFTs on a network. You can copy and paste this component into your project to add a search bar for NFTs.

## Installation

To use this component, you need to have a thirdweb project set up. If you don't have one, you can create a new project using the following command:

```bash
npx thirdweb create --template next-typescript-starter
```

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

On `pages/_app.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

## Environment Variables

To run this project, you will need to add environment variables. Check the `.env.example` file for all the environment variables required and add it to `.env.local` file or set them up on your hosting provider.

Then, copy and paste the NFTSearcher component into your project.

## Usage

You can use the NFTSearcher component in your React components like this:

```jsx
import {useCallback } from "react";
import NFTSearcher from './NFTSearcher';

function MyComponent() {
    const [fetchedNFTs, setFetchedNFTs] = useState<any[]>([]);

    // handle fetched NFTs
      const handleNFTsFetched = useCallback((nfts: any[]) => {
        setFetchedNFTs(nfts);
    }, [setLoading, setFetchedNFTs]);

  return (
    <NFTSearcher 
      activeNetwork="ethereum" 
      limit={10} 
      start={0} 
      theme="dark" 
      onNFTsFetched={handleNFTsFetched}
    />
  );
}
```

## Props

The NFTSearcher component accepts the following props:

- `activeNetwork`: The network to search for NFTs on. Default is 'ethereum'.
- `limit`: The maximum number of NFTs to fetch.
- `start`: The index to start fetching NFTs from.
- `theme`: The theme of the search bar. Can be 'dark' or 'light'. Default is 'light'.
- `onNFTsFetched`: A callback function that is called when NFTs are fetched. The function receives an array of NFTs as its argument.
- `classNames`: An object that can be used to override the default class names for various elements of the component.

## Styling

The NFTSearcher component uses inline styles for styling. You can override the default styles by passing a `classNames` prop with the class names for the elements you want to style.

## Network Support

The NFTSearcher component supports the following networks (but can be extended to support any of the networks that thirdweb supports):

- Ethereum
- Polygon
- Fantom
- Avalanche
- Frame Testnet

## Directory

The NFTSearcher component fetches NFTs from a directory. The directory is fetched from a URL based on the active network. If you wish to create a directory in your project the directory should be structured as an array of objects, each representing a collection. Each collection object should have the following properties:

- `contract`: The contract address of the collection.
- `name`: The name of the collection.
- `symbol`: The symbol of the collection.
- `image`: The image of the collection.

Here is an example of a directory:

```json
[
    {
        "contract": "0x8f170F73076b7A45749677B1681b13366B3C80f7",
        "name": "Hexagonal Zero",
        "symbol": "HEXZ",
        "image": "ipfs://QmeV9C1VmJDJ7jCLy8GUwqhrRRj3VVxzood31pEyyWZtnw/001.png"
    }
]
```

## Dependencies

The NFTSearcher component depends on the following thirdweb packages:

- `@thirdweb-dev/react`: For using the `useNFTs` and `useContract` hooks and the `MediaRenderer` component.


## Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy
```

## Learn More

To learn more about thirdweb and Next.js, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Templates](https://thirdweb.com/templates)

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Contributing

If you find any bugs or have a feature request, please open an issue on [the thirdweb GitHub organization](https://github.com/thirdweb-dev). Your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
