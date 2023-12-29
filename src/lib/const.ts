import { ethers } from "ethers";
export const fromBlock = 16308214;
export const toBlock = 18868209;
export interface Transaction {
  hash: string;
  gasPrice: string;
  gasUsed: ethers.BigNumber;
  from: string;
  to: string;
  value: string;
}
