"use client";

import {
  getBalanceByTimestamp,
  getDeployedContracts,
  getMintedNFTs,
  getTokenBalances,
} from "@/lib/alchemy";
import { fetchDetailsOfYear } from "@/lib/helper";
import axios from "axios";

export default function Home() {
  const dummyWallet = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const fetchAddressData = async () => {
  
    await axios.get(`/api/fetchAddressData?address=${dummyWallet}`).then((res) => {
      console.log(res);
    });
        // await fetch(`/api/hello`).then(
        //   (res) => {
        //     console.log(res);
        //   }
        // );
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="">2023 Recap</h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
        <button
          onClick={async () => {
            console.log(
              "Total Gas & Transactions + ERC721 ERC1155 Transfers Most Transacted Wallet"
            );

            await fetchDetailsOfYear(
              "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
            ); //Vitalik.eth
            // await fetchDetailsOfYear("0xA4DA350702f06FB8AdE5eba73cdF63DCbBd3a426")
            console.log("Starting Balance");
            await getBalanceByTimestamp(
              "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
              "2023-01-01T00:00:00Z"
            );
            console.log("Ending Balance");
            await getBalanceByTimestamp(
              "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
              "2023-12-31T23:59:59Z"
            );
            console.log("Minted NFTS");
            await getMintedNFTs("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
            console.log("Deployed Contracts");

            await getDeployedContracts(
              "0xB8D66FB00061378afd77c5C22E47cFf9C57ca62f"
            ); //pol token contract creator

            console.log("Token Balances");

            await getTokenBalances(
              "0xA4DA350702f06FB8AdE5eba73cdF63DCbBd3a426"
            ); //Taking time
            //Can change this to fetching some token balances
            // https://docs.alchemy.com/docs/how-to-get-token-balance-for-an-address
          }}
        >
          Generate Year Data
        </button>
        <br></br>
        <button onClick={fetchAddressData}>Generate Year Data using API</button>
      </div>
    </main>
  );
}
