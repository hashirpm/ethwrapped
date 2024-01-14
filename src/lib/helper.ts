export function calculatePercentageChange(
  startPrice: number,
  endPrice: number
) {
  // Ensure both prices are valid numbers
  if (typeof startPrice !== "number" || typeof endPrice !== "number") {
    throw new Error("Both startPrice and endPrice must be numbers");
  }

  // Calculate the percentage change
  const percentageChange = ((endPrice - startPrice) / startPrice) * 100;

  return percentageChange;
}

export function isValidEthereumAddress(address: string) {
  // Ethereum address pattern with or without '0x' prefix
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

  // Check if the input matches the pattern
  return addressRegex.test(address);
}
