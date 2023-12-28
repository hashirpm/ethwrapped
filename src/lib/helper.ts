import axios from "axios";
import { ethers } from "ethers";
import { fromBlock, toBlock } from "./const";

interface Transaction {
  hash: string;
  gasPrice: string;
  gasUsed: ethers.BigNumber;
  from: string;
  to: string;
  value: string;
}
const web3ClientUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

export const fetchDetailsOfYear = async (address: string) => {
  const startBlock = fromBlock;
  const endBlock = toBlock;

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
  // const currentEtherBalance = await getCurrentEtherBalance(
  //   address,
  //   params,
  //   etherscanApiKey
  // );

  const txns = await getTransactions(address, params, etherscanApiKey);
  console.log("Most Transacted Address");
  const mostTransactedDetails = findMostTransactedAddress(address, txns);
  console.log({ mostTransactedDetails });

  console.log("Eth send and recieved");
  const ethRevievedAndSent = getTotalEthReceivedAndSent(address, txns);
  console.log({ethRevievedAndSent})

  let cumulativeGasUsed = 0.0;

  for (const txn of txns) {
    const gasPrice = ethers.utils.formatUnits(txn.gasPrice, "gwei");
    const gasUsed = txn.gasUsed.toNumber();

    const totalGas = parseFloat(gasPrice) * gasUsed;
    cumulativeGasUsed += totalGas;
  }

  console.log(`Total Gas Spent: ${cumulativeGasUsed} GWEI`);
  const erc20Transfers = await getERC20Transfers(
    address,
    params,
    etherscanApiKey
  );
  const erc721Transfers = await getERC721Transfers(
    address,
    params,
    etherscanApiKey
  );
};
const getCurrentEtherBalance = async (
  address: string,
  params: any,
  apiKey: string
) => {
  try {
    const url = "https://api.etherscan.io/api";

    const response = await axios.get(url, {
      params: {
        module: "account",
        action: "balance",
        address,
        apiKey,
        ...params,
      },
    });

    if (response.data.status !== "1") {
      throw new Error(`Error from Etherscan API: ${response.data.message}`);
    }
    console.log("getEtherBalance", response.data);
    console.log(`Total Ether Balance: ${response.data.result / 1e18} ETH`);

    // const transactions: Transaction[] = response.data.result.map((tx: any) => ({
    //   hash: tx.hash,
    //   gasPrice: tx.gasPrice,
    //   gasUsed: ethers.BigNumber.from(tx.gasUsed),
    // }));

    // return transactions;
    return response.data;
  } catch (error: any) {
    console.error("Error fetching transactions:", error.message);
    throw error;
  }
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
    console.log(response.data.result);

    if (response.data.status !== "1") {
      throw new Error(`Error from Etherscan API: ${response.data.message}`);
    }
    console.log("getTransactions", response.data);

    const transactions: Transaction[] = response.data.result.map((tx: any) => ({
      hash: tx.hash,
      gasPrice: tx.gasPrice,
      gasUsed: ethers.BigNumber.from(tx.gasUsed),
      to: tx.to,
      from: tx.from,
      value: tx.value,
    }));

    return transactions;
  } catch (error: any) {
    console.error("Error fetching transactions:", error.message);
    throw error;
  }
};

const findMostTransactedAddress = (
  address: string,
  transactions: Transaction[]
) => {
  // Count the occurrences of each address
  const addressCounts: { [address: string]: number } = {};
  transactions.forEach((tx) => {
    const fromAddress = tx.from.toLowerCase();
    const toAddress = tx.to.toLowerCase();

    if (fromAddress != address.toLowerCase()) {
      // Increment count for fromAddress
      addressCounts[fromAddress] = (addressCounts[fromAddress] || 0) + 1;
    }
    // Increment count for toAddress
    if (toAddress != address.toLowerCase()) {
      addressCounts[toAddress] = (addressCounts[toAddress] || 0) + 1;
    }
  });

  // Find the address with the highest count
  let mostTransactedAddress = "";
  let highestCount = 0;
  Object.entries(addressCounts).forEach(([address, count]) => {
    if (count > highestCount) {
      mostTransactedAddress = address;
      highestCount = count;
    }
  });

  return { mostTransactedAddress, highestCount };
};

const getTotalEthReceivedAndSent = (
  address: string,
  transactions: Transaction[]
) => {
  // Convert the target address to lowercase once
  const lowercaseAddress = address.toLowerCase();

  // Initialize total amounts
  let totalEthReceived = 0;
  let totalEthSent = 0;

  transactions.forEach((tx) => {
    const fromAddress = tx.from.toLowerCase();
    const toAddress = tx.to.toLowerCase();

    // Check if the transaction involves the target address
    if (fromAddress === lowercaseAddress) {
      // Increment totalEthSent with the amount sent by the target address
      totalEthSent += parseFloat(tx.value) / 1e18; 
    }

    if (toAddress === lowercaseAddress) {
      // Increment totalEthReceived with the amount received by the target address
      totalEthReceived += parseFloat(tx.value) / 1e18;
    }
  });

  return {
    totalEthReceived,
    totalEthSent,
  };
};

const getERC20Transfers = async (
  address: string,
  params: any,
  apiKey: string
) => {
  try {
    const url = "https://api.etherscan.io/api";

    const response = await axios.get(url, {
      params: {
        module: "account",
        action: "tokentx",
        address,
        apiKey,
        ...params,
      },
    });

    if (response.data.status !== "1") {
      throw new Error(`Error from Etherscan API: ${response.data.message}`);
    }
    console.log("getERC20Transfers", response.data);

    // const transactions: Transaction[] = response.data.result.map((tx: any) => ({
    //   hash: tx.hash,
    //   gasPrice: tx.gasPrice,
    //   gasUsed: ethers.BigNumber.from(tx.gasUsed),
    // }));

    // return transactions;
    return response.data;
  } catch (error: any) {
    console.error("Error fetching transactions:", error.message);
    throw error;
  }
};

const getERC721Transfers = async (
  address: string,
  params: any,
  apiKey: string
) => {
  try {
    const url = "https://api.etherscan.io/api";

    const response = await axios.get(url, {
      params: {
        module: "account",
        action: "tokennfttx",
        address,
        apiKey,
        ...params,
      },
    });

    if (response.data.status !== "1") {
      throw new Error(`Error from Etherscan API: ${response.data.message}`);
    }
    console.log("getERC721Transfers", response.data);

    // const transactions: Transaction[] = response.data.result.map((tx: any) => ({
    //   hash: tx.hash,
    //   gasPrice: tx.gasPrice,
    //   gasUsed: ethers.BigNumber.from(tx.gasUsed),
    // }));

    // return transactions;
    return response.data;
  } catch (error: any) {
    console.error("Error fetching transactions:", error.message);
    throw error;
  }
};
