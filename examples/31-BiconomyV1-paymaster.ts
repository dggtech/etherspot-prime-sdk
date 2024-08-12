import { ethers } from 'ethers';
import { EtherspotBundler, Factory, PrimeSdk } from '../src';
import { printOp } from '../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';
import { ERC20_ABI } from '../src/sdk/helpers/abi/ERC20_ABI';
import { PaymasterMode } from '@biconomy/paymaster';

dotenv.config();

const recipient = '0x80a1874E1046B1cc5deFdf4D3153838B72fF94Ac'; // recipient wallet address
const value = '0.000001'; // transfer value
const bundlerApiKey =
  'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

const biconomy_paymaster_url = ``; // ADD: BICONOMY PAYMASTER URL HERE

const BICONOM_PAYMASTER_ADDRESS = '0x00000f7365cA6C59A2C93719ad53d567ed49c14C';

const selectedFeeQuote = {
  symbol: 'USDT',
  decimal: 18,
  tokenAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
};

async function main() {
  // initializing sdk...
  const primeSdk = new PrimeSdk(
    { privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      factoryWallet: Factory.BICONOMY_V1,
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey),
    },
  );

  console.log('address: ', primeSdk.state.EOAAddress);

  // get address of EtherspotWallet...
  const address: string = await primeSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `Biconomy V1 address: ${address}`);

  // get balance of the account address
  let balance = await primeSdk.getNativeBalance();
  console.log('balances: ', balance);

  const erc20Contract = new ethers.Contract(selectedFeeQuote.tokenAddress, ERC20_ABI);
  const encodedData = erc20Contract.interface.encodeFunctionData('approve', [
    BICONOM_PAYMASTER_ADDRESS,
    ethers.constants.MaxUint256,
  ]); // Infinite Approval
  const approveOp = await primeSdk.addUserOpsToBatch({ to: selectedFeeQuote.tokenAddress, data: encodedData });

  // add transactions to the batch
  const transactionBatch = await primeSdk.addUserOpsToBatch(
    { to: recipient, value: ethers.utils.parseEther(value) },
    approveOp,
  );
  console.log('transactions: ', transactionBatch);

  // get balance of the account address
  balance = await primeSdk.getNativeBalance();

  console.log('balances: ', balance);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await primeSdk.estimate(
    {
      paymasterDetails: {
        url: biconomy_paymaster_url,
        paymasterServiceData: {
          mode: PaymasterMode.ERC20,
          feeTokenAddress: selectedFeeQuote.tokenAddress,
          calculateGasLimits: true,
        },
      },
    },
    transactionBatch,
  );
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
