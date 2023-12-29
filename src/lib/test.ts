import { fromBlock, toBlock } from "./const";

const { Alchemy, Utils, Network } = require("alchemy-sdk");
const EthDater = require("ethereum-block-by-date");

const apiKey = process.env.ALCHEMY_API_KEY;

const settings = {
  apiKey: apiKey,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const dater = new EthDater(
  alchemy.core // Ethers provider, required.
);

export const getBalanceByTimestamp = async (
  address: string,
  timestamp: string
) => {
  // Get blocknumber
  let block = await dater.getDate(timestamp);
  block = block["block"];

  // Get balance and format in terms of ETH
  let balance = await alchemy.core.getBalance(address, block);
  balance = Utils.formatEther(balance);
  console.log(`Balance of ${address}: ${balance} ETH`);
};
export const getMintedNFTs = async (address: string) => {
  const res = await alchemy.core.getAssetTransfers({
    fromBlock: fromBlock,
    toBlock: toBlock,
    fromAddress: "0x0000000000000000000000000000000000000000",
    toAddress: address,
    excludeZeroValue: true,
    category: ["erc721", "erc1155"],
  });
  // Print contract address and tokenId for each NFT (ERC721 or ERC1155):
  const erc721List = [];
  const erc1155List = [];
  for (const events of res.transfers) {
    if (events.erc1155Metadata == null) {
      erc721List.push({
        address: events.rawContract.address,
        tokenId: events.tokenId,
      });
      // console.log(
      //   "ERC-721 Token Minted: ID- ",
      //   events.tokenId,
      //   " Contract- ",
      //   events.rawContract.address
      // );
    } else {
      for (const erc1155 of events.erc1155Metadata) {
        erc1155List.push({
          address: events.rawContract.address,
          tokenId: events.tokenId,
        });

        // console.log(
        //   "ERC-1155 Token Minted: ID- ",
        //   erc1155.tokenId,
        //   " Contract- ",
        //   events.rawContract.address
        // );
      }
    }
  }
  console.log({ erc721List });
  console.log({ erc1155List });
};

export const getDeployedContracts = async (address: string) => {
  const transfers = [];

  // Paginate through the results using getAssetTransfers method
  let response = await alchemy.core.getAssetTransfers({
    fromBlock: fromBlock,
    toBlock: toBlock,
    fromAddress: address, // Filter results to only include transfers from the specified address
    excludeZeroValue: false, // Include transfers with a value of 0
    category: ["external"], // Filter results to only include external transfers
  });
  transfers.push(...response.transfers);

  // Continue fetching and aggregating results while there are more pages
  while (response.pageKey) {
    let pageKey = response.pageKey;
    response = await alchemy.core.getAssetTransfers({
      fromBlock: fromBlock,
      toBlock: toBlock,
      fromAddress: address,
      excludeZeroValue: false,
      category: ["external"],
      pageKey: pageKey,
    });
    transfers.push(...response.transfers);
  }

  // Filter the transfers to only include contract deployments (where 'to' is null)
  const deployments = transfers.filter((transfer) => transfer.to === null);
  const txHashes = deployments.map((deployment) => deployment.hash);

  // Fetch the transaction receipts for each of the deployment transactions
  const promises = txHashes.map((hash) =>
    alchemy.core.getTransactionReceipt(hash)
  );

  // Wait for all the transaction receipts to be fetched
  const receipts = await Promise.all(promises);
  const contractAddresses = receipts.map((receipt) => receipt?.contractAddress);
  console.log({ contractAddresses });
};
export const getTokenBalances = async (address: string) => {
  // Get token balances
  const balances = await alchemy.core.getTokenBalances(address);
  // console.log(balances)
  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
    return (
      token.tokenBalance !==
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
  });

  const tokenBalanceList = [];
  // Counter for SNo of final output
  let i = 1;

  // Loop through all tokens with non-zero balance
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance = token.tokenBalance;

    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(2);

    tokenBalanceList.push({
      name: metadata.name,
      balance: balance,
      symbol: metadata.symbol,
    });
    console.log("fetching");
  }
  console.log({ tokenBalanceList });
};
// export const getNFTAirdrops = async (address: string) => {
//   //Define the optional `options` parameters
//   const nftList = [];
//   let options = {
//     excludeFilters: "SPAM",
//     orderBy: "TRANSFERTIME",
//   };

//   //Call the method to get the nfts owned by this address
//   let response = await alchemy.nft.getNftsForOwner(address, options);

//   nftList.push(...response.ownedNfts);
//   while (response.pageKey) {
//     let pageKey = response.pageKey;
//     response = await alchemy.nft.getNftsForOwner(address, options, pageKey);
//     nftList.push(...response.ownedNfts);
//   }
//   console.log({ nftList });
//   // Filter ownedNfts for the year 2023
//   const ownedNfts2023 = nftList.filter((nft: any) => {
//     const nftTimestamp = new Date(nft.blockTimestamp);
//     return nftTimestamp.getFullYear() === 2023;
//   });
//   console.log({ ownedNfts2023 });
// };
