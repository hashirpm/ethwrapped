import { Transaction } from "@/lib/const";
import { ethers } from "ethers";

export const processTransactions = (address: string, transactions: Transaction[]) => {
  const addressCounts: { [address: string]: number } = {};
  let totalEthReceived = 0;
  let totalEthSent = 0;
  let cumulativeGasUsed = 0.0;
  transactions.forEach((tx) => {
    const fromAddress = tx.from.toLowerCase();
    const toAddress = tx.to.toLowerCase();
    const gasPrice = ethers.utils.formatUnits(tx.gasPrice, "gwei");
    const gasUsed = tx.gasUsed.toNumber();

    const totalGas = parseFloat(gasPrice) * gasUsed;
    cumulativeGasUsed += totalGas;
    if (fromAddress != address.toLowerCase()) {
      // Increment count for fromAddress
      addressCounts[fromAddress] = (addressCounts[fromAddress] || 0) + 1;
    } else {
      totalEthSent += parseFloat(tx.value) / 1e18;
    }
    // Increment count for toAddress
    if (toAddress != address.toLowerCase()) {
      addressCounts[toAddress] = (addressCounts[toAddress] || 0) + 1;
    } else {
      totalEthReceived += parseFloat(tx.value) / 1e18;
    }
  });

  // Find the address with the highest count
  let mostTransactedAddress = "";
  let mostTransactedCount = 0;
  Object.entries(addressCounts).forEach(([address, count]) => {
    if (count > mostTransactedCount) {
      mostTransactedAddress = address;
      mostTransactedCount = count;
    }
  });

  return {
    mostTransactedAddress,
    mostTransactedCount,
    totalEthReceived,
    totalEthSent,
    cumulativeGasUsed,
  };
};
