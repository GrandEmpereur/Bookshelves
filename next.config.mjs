/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        domains: ['picsum.photos', 'your-image-domain.com'],
    }
};

export default nextConfig;
