import axios from "axios";
import { ethers } from "ethers";

interface Transaction {
  hash: string;
  gasPrice: string;
  gasUsed: ethers.BigNumber;
}
const web3ClientUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

export const fetchDetailsOfYear = async (address: string) => {
  const startBlock = 16308214;
  const endBlock = 18868209;

  await fetchGas(address, startBlock, endBlock);
};

const fetchGas = async (
  address: string,
  startBlock: number,
  endBlock: number
) => {
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "";

  const params = {
    startBlock,
    endBlock,
    page: 0,
    offset: 0,
    sort: "asc",
  };
  console.log(params);

  const txns = await getTransactions(address, params, etherscanApiKey);
  let cumulativeGasUsed = 0.0;

  for (const txn of txns) {
    const gasPrice = ethers.utils.formatUnits(txn.gasPrice, "gwei");
    const gasUsed = txn.gasUsed.toNumber();

    const totalGas = parseFloat(gasPrice) * gasUsed;
    cumulativeGasUsed += totalGas;
  }

  console.log(`Total Gas Spent: ${cumulativeGasUsed} GWEI`);
};

const getTransactions = async (
  address: string,
  params: any,
  apiKey: string
) => {
  try {
    const url = "https://api.etherscan.io/api";

    const response = await axios.get(url, {
      params: {
        module: "account",
        action: "txlist",
        address,
        apiKey,
        ...params,
      },
    });

    if (response.data.status !== "1") {
      throw new Error(`Error from Etherscan API: ${response.data.message}`);
    }
    console.log("getTransactions", response.data);

    const transactions: Transaction[] = response.data.result.map((tx: any) => ({
      hash: tx.hash,
      gasPrice: tx.gasPrice,
      gasUsed: ethers.BigNumber.from(tx.gasUsed),
    }));

    return transactions;
  } catch (error: any) {
    console.error("Error fetching transactions:", error.message);
    throw error;
  }
};

//Not working needs update
const getBlocks = async (datetime: Date) => {
  const rpcApiKey = process.env.RPC_API_KEY || "";
  const provider = new ethers.providers.JsonRpcProvider(web3ClientUrl);

  try {
    // Get the latest block number
    const latestBlock = await provider.getBlockNumber();

    // Iterate backward through blocks to find the closest one with a timestamp before or equal to the given datetime
    for (let blockNumber = latestBlock; blockNumber >= 0; blockNumber--) {
      const block = await provider.getBlockWithTransactions(blockNumber);
      if (!block) {
        throw new Error(`Unable to retrieve block number ${blockNumber}`);
      }

      const blockTimestamp = block.timestamp * 1000; // Convert to milliseconds
      if (blockTimestamp <= datetime.getTime()) {
        return blockNumber;
      }
    }

    throw new Error("No block found for the given datetime");
  } catch (error: any) {
    console.error("Error fetching block:", error.message);
    throw error;
  }
};
