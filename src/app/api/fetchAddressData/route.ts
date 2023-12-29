import { fromBlock, toBlock } from "@/lib/const";
import { NextRequest, NextResponse } from "next/server";

import { getTransactions } from "./fetchTransactions";
import { processTransactions } from "./processTransaction";
import { getERC20Transfers } from "./getERC20Transfers";
import { getERC721Transfers } from "./getERC721Transfers";


export async function GET(req: NextRequest) {
  //   const reqBody = await req.json();
  //   const walletAddress = reqBody.address;
  console.log("inside server");
  const { searchParams } = new URL(req.url as string);
  const walletAddress = searchParams.get("address") as string;
  const startBlock = fromBlock;
  const endBlock = toBlock;
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "";

  const params = {
    startBlock,
    endBlock,
    page: 0,
    offset: 0,
    sort: "asc",
  };
  const txns = await getTransactions(walletAddress, params, etherscanApiKey);
  const txnProcessedData = processTransactions(walletAddress, txns);
  const erc20Transfers = await getERC20Transfers(
    walletAddress,
    params,
    etherscanApiKey
  );
  const erc721Transfers = await getERC721Transfers(
    walletAddress,
    params,
    etherscanApiKey
  );
  console.log(erc20Transfers)
  console.log(erc721Transfers)
  // const startingBalance = await getBalanceByTimestamp(
  //   walletAddress,
  //   "2023-01-01T00:00:00Z"
  // );
  // const endingBalance = await getBalanceByTimestamp(
  //   walletAddress,
  //   "2023-12-31T23:59:59Z"
  // );
  // const mintedNfts = await getMintedNFTs(walletAddress);
  // const deployedContracts = await getDeployedContracts(walletAddress);
  // const tokenBalances = await getTokenBalances(walletAddress);
  return NextResponse.json({
    txnCount: txns.length,
    mostTransactedAddress: txnProcessedData.mostTransactedAddress,
    mostTransactedCount: txnProcessedData.mostTransactedCount,
    totalEthRecieved: txnProcessedData.totalEthReceived,
    totalEthSent: txnProcessedData.totalEthSent,
    cumulativeGasUsed: txnProcessedData.cumulativeGasUsed,
    erc20TransferCount: erc20Transfers.result.length,
    erc721TransferCount: erc721Transfers.result.length,
    // startingBalance: startingBalance,
    // endingBalance: endingBalance,
    // mintedNftsCount:
    //   mintedNfts.erc721List.length + mintedNfts.erc1155List.length,
    // deployedContractsCount: deployedContracts.contractAddresses.length,
    // tokenBalances: tokenBalances,
  });
}
