import { A as AbstractVanillaExtractPlugin } from './plugin-6f7ff6ec.esm.js';
import '@vanilla-extract/integration';

class VanillaExtractPlugin extends AbstractVanillaExtractPlugin {
  apply(compiler) {
    this.inject(compiler, 'virtualFileLoader');
  }
}

export { VanillaExtractPlugin };
