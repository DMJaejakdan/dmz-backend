import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin/next';
import { NextConfig } from 'next/dist/server/config-shared';

type PluginOptions = ConstructorParameters<typeof VanillaExtractPlugin>[0];
declare const createVanillaExtractPlugin: (pluginOptions?: PluginOptions) => (nextConfig?: NextConfig) => NextConfig;

export { createVanillaExtractPlugin };
