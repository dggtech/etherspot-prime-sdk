import { ethers } from 'ethers';
import { EtherspotBundler, PrimeSdk } from '../src';
import { printOp } from '../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';
import { ERC20_ABI } from '../src/sdk/helpers/abi/ERC20_ABI';
import { PaymasterMode } from '@biconomy/paymaster';

dotenv.config();

const recipient = '0x80a1874E1046B1cc5deFdf4D3153838B72fF94Ac'; // recipient wallet address
const value = '0'; // transfer value
const bundlerApiKey =
  'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

const biconomy_paymaster_url = `https://paymaster.biconomy.io/api/v1/80001/7iO36xVjV.56d7f888-b5b7-47b7-8803-443a8759348e`;

const BICONOM_PAYMASTER_ADDRESS = '0x00000f7365cA6C59A2C93719ad53d567ed49c14C';

async function main() {
  // initializing sdk...
  const primeSdk = new PrimeSdk(
    { privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey),
    },
  );

  console.log('address: ', primeSdk.state.EOAAddress);

  // get address of EtherspotWallet...
  const address: string = await primeSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // get balance of the account address
  let balance = await primeSdk.getNativeBalance();
  console.log('balances: ', balance);

  const selectedFeeQuote = {
    symbol: 'WMATIC',
    decimal: 18,
    tokenAddress: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
  };

  const erc20Contract = new ethers.Contract(selectedFeeQuote.tokenAddress, ERC20_ABI);
  const encodedData = erc20Contract.interface.encodeFunctionData('approve', [
    BICONOM_PAYMASTER_ADDRESS,
    ethers.constants.MaxUint256,
  ]); // Infinite Approval
  await primeSdk.addUserOpsToBatch({ to: selectedFeeQuote.tokenAddress, data: encodedData });

  // add transactions to the batch
  const transactionBatch = await primeSdk.addUserOpsToBatch({ to: recipient, value: ethers.utils.parseEther(value) });
  console.log('transactions: ', transactionBatch);

  // get balance of the account address
  balance = await primeSdk.getNativeBalance();

  console.log('balances: ', balance);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await primeSdk.estimate({
    paymasterDetails: {
      url: biconomy_paymaster_url,
      paymasterServiceData: {
        mode: PaymasterMode.ERC20,
        feeTokenAddress: selectedFeeQuote.tokenAddress,
        calculateGasLimits: true,
      },
    },
  });
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp and sending to the bundler...
  const uoHash = await primeSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
    await sleep(2);
    userOpsReceipt = await primeSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
