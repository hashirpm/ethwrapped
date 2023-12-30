import { getDefaultProvider } from "ethers";

const ethMainnetProvider = getDefaultProvider(process.env.INFURA_RPC_URL);

export const getAddressByEns = async (ensName: string) => {
    try {
        const address = await ethMainnetProvider.resolveName(ensName);
        return address;
    } catch (error) {
        console.error('Error occurred while looking up address:', error);
        return null;
    }
}