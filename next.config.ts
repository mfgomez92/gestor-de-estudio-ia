import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Export the app as a fully static bundle so Firebase Hosting can serve it
   * from the generated `out` directory.
   */
  output: "export",
};

export default nextConfig;
