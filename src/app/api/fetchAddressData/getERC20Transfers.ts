import axios from "axios";

export const getERC20Transfers = async (
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

    // if (response.data.status !== "1") {
    //   throw new Error(`Error from Etherscan API: ${response.data.message}`);
    // }
    // console.log("getERC20Transfers", response.data);

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
