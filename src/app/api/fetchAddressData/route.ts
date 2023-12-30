import { fromBlock, toBlock } from "@/lib/const";
import { NextRequest, NextResponse } from "next/server";

import { getTransactions } from "./fetchTransactions";
import { processTransactions } from "./processTransaction";


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


  return NextResponse.json({
    txnCount: txns.length,
    mostTransactedAddress: txnProcessedData.mostTransactedAddress,
    totalEthRecieved: txnProcessedData.totalEthReceived,
    totalEthSent: txnProcessedData.totalEthSent,
    cumulativeGasUsed: txnProcessedData.cumulativeGasUsed,
  });
}
