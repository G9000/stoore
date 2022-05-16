/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.pexels.com",
            "<random_string>.supabase.in",
            "lh3.googleusercontent.com",
        ],
    },
};

module.exports = nextConfig;
