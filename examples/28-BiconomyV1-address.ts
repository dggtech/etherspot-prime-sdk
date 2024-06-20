import { EtherspotBundler, Factory, PrimeSdk } from '../src';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const bundlerApiKey =
    'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  // initializating sdk...
  const primeSdk = new PrimeSdk(
    { privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      factoryWallet: Factory.BICONOMY_V1,
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey),
    },
  );

  // get BiconomyV1 address...
  const address: string = await primeSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `Biconomy V1 address: ${address}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
