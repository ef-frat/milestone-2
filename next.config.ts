import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keeps React in strict mode
  output: "standalone", // Enables standalone build for serverless environments
};

export default nextConfig;