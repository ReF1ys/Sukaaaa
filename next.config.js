/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Игнорировать ошибки TS во время сборки проекта
    ignoreBuildErrors: true,
  },
  eslint: {
    // Игнорировать ошибки ESLint во время сборки проекта
    ignoreDuringBuilds: true,
  },
  // Другие настройки конфигурации Next.js
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig; 