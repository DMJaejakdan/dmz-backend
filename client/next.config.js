const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

process.env.TZ = 'Asia/Seoul';
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withVanillaExtract(nextConfig);
