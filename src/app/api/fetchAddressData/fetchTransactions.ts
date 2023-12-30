import { Transaction } from "@/lib/const";
import axios from "axios";
import { ethers } from "ethers";

export const getTransactions = async (
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
