import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const GNOSIS_APIURL =
  "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai";
const MAINNET_APIURL = "https://api.thegraph.com/subgraphs/name/poap-xyz/poap";

const gnosisClient = new ApolloClient({
  uri: GNOSIS_APIURL,
  cache: new InMemoryCache(),
});
const mainnetClient = new ApolloClient({
  uri: MAINNET_APIURL,
  cache: new InMemoryCache(),
});
export const fetchPoaps = async (address: string) => {
  const tokenQuery = `
    query {
      tokens(
        where: {
          owner_contains_nocase: "${address}"
          created_gte: "1672531200"
          created_lte: "1704067199"
        }
      ) {
        created
        event {
          id
        }
      }
    }
  `;
  try {
    const gnosisPoaps = await gnosisClient.query({
      query: gql(tokenQuery),
    });
    const mainnetPoaps = await mainnetClient.query({
      query: gql(tokenQuery),
    });
    return {
      total: gnosisPoaps.data.tokens.length + mainnetPoaps.data.tokens.length,
      gnosisPoapCount: gnosisPoaps.data.tokens.length,
      mainnetPoapCount: mainnetPoaps.data.tokens.length,
    };
  } catch (err) {
    console.log("Error fetching data: ", err);
  }
};
