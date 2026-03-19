/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "feeffkiwbhvftuxmjnqa.supabase.co",
      },
    ],
  },
}

export default nextConfig