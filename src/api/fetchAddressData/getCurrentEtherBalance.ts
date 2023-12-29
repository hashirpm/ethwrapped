import axios from "axios";

export const getCurrentEtherBalance = async (
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
