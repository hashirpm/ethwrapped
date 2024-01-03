import { fromBlock, toBlock } from "@/lib/const";

const { Alchemy, Utils, Network } = require("alchemy-sdk");
const EthDater = require("ethereum-block-by-date");

const alchemyApiKey = process.env.ALCHEMY_API_KEY;

const settings = {
  apiKey: alchemyApiKey,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const dater = new EthDater(alchemy.core);

export const getBalanceByTimestamp = async (address: string, val: 0 | 1) => {
  if (val == 0) {
    let balance = await alchemy.core.getBalance(address, fromBlock);
    balance = Utils.formatEther(balance);

    return { balance };
  } else {
    let balance = await alchemy.core.getBalance(address, toBlock);
    balance = Utils.formatEther(balance);

    return { balance };
  }
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

  const erc721List = [];
  const erc1155List = [];
  for (const events of res.transfers) {
    if (events.erc1155Metadata == null) {
      erc721List.push({
        address: events.rawContract.address,
        tokenId: events.tokenId,
      });
    } else {
      for (const erc1155 of events.erc1155Metadata) {
        erc1155List.push({
          address: events.rawContract.address,
          tokenId: events.tokenId,
        });
      }
    }
  }

  return { erc721List, erc1155List };
};

export const getDeployedContracts = async (address: string) => {
  const transfers = [];

  let response = await alchemy.core.getAssetTransfers({
    fromBlock: fromBlock,
    toBlock: toBlock,
    fromAddress: address,
    excludeZeroValue: false,
    category: ["external"],
  });
  transfers.push(...response.transfers);

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

  const deployments = transfers.filter((transfer) => transfer.to === null);
  const txHashes = deployments.map((deployment) => deployment.hash);

  const promises = txHashes.map((hash) =>
    alchemy.core.getTransactionReceipt(hash)
  );

  const receipts = await Promise.all(promises);
  const contractAddresses = receipts.map((receipt) => receipt?.contractAddress);

  return { contractAddresses };
};
export const getTokenBalances = async (address: string) => {
  const balances = await alchemy.core.getTokenBalances(address);

  const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
    return (
      token.tokenBalance !==
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
  });

  const tokenBalanceList = [];

  let i = 1;

  for (let token of nonZeroBalances) {
    let balance = token.tokenBalance;

    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(2);

    tokenBalanceList.push({
      name: metadata.name,
      balance: balance,
      symbol: metadata.symbol,
    });
    console.log("fetching");
  }

  return { tokenBalanceList };
};
