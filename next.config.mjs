/** @type {import('next').NextConfig} */
const nextConfig = {
  // All imagery is served from /public. The images.unsplash.com remote pattern
  // was removed along with the hotlinked stock photos in the hero — if a
  // remote image host is ever needed, add it back here explicitly.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
