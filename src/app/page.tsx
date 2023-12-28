"use client";

import { getBalanceByTimestamp, getDeployedContracts, getMintedNFTs, getTokenBalances } from "@/lib/alchemy";
import { fetchDetailsOfYear } from "@/lib/helper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="">2023 Recap</h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
        <button
          onClick={() => {
            // fetchDetailsOfYear("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"); //Vitalik.eth
            // // fetchDetailsOfYear("0xA4DA350702f06FB8AdE5eba73cdF63DCbBd3a426")
            // getBalanceByTimestamp(
            //   "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
            //   "2023-12-31T00:00:00Z"
            // )
            // getMintedNFTs("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
            // getDeployedContracts("0xB8D66FB00061378afd77c5C22E47cFf9C57ca62f"); //pol token contract creator
            getTokenBalances("0xA4DA350702f06FB8AdE5eba73cdF63DCbBd3a426"); //Taking time
            //Can change this to fetching some token balances
            // https://docs.alchemy.com/docs/how-to-get-token-balance-for-an-address
            
          }}
        >
          Generate Year Data
        </button>
      </div>
    </main>
  );
}
