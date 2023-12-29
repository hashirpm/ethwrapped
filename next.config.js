/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
  },
};

module.exports = nextConfig;
