import { ethers } from 'ethers';
import { EtherspotBundler, PaymasterType, PrimeSdk } from '../src';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';
dotenv.config();

async function main() {
  const arka_url = 'https://arka.etherspot.io';
  const arka_api_key = 'arka_public_key';
  const privateKey = process.env.WALLET_PRIVATE_KEY;

  const recipient = '0x33F3Bd580C061A1e8bF543a215907699B13BB9ec'; // recipient wallet address
  const chainId = 888888888;
  const TOKEN_ADDRESS = '0x97423A68BAe94b5De52d767a17aBCc54c157c0E5';
  const PAYMASTER_ADDRESS = '0xa056CC60088CEfba94d9e16d5408459039FA8D64';

  // const chainId = 28122024;
  // const TOKEN_ADDRESS = '0x453478E2E0c846c069e544405d5877086960BEf2';
  // const PAYMASTER_ADDRESS = '0xe85649152D15825F2226B2d9C49c07b1cd2b36C7';

  const value = '0'; // transfer value
  const primeSdk = new PrimeSdk(
    { privateKey },
    {
      chainId,
      bundlerProvider: new EtherspotBundler(Number(chainId), arka_api_key),
    },
  );

  console.log('address: ', primeSdk.state.EOAAddress);

  // get address of EtherspotWallet...
  const address: string = await primeSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // get balance of the account address
  const balance = await primeSdk.getNativeBalance();

  console.log('balances: ', balance);

  const ERC20Abi = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  const erc20Contract = new ethers.Contract(TOKEN_ADDRESS, ERC20Abi);
  const encodedData = erc20Contract.interface.encodeFunctionData('approve', [PAYMASTER_ADDRESS, 1000000000]); // 100 token
  await primeSdk.addUserOpsToBatch({ to: TOKEN_ADDRESS, data: encodedData });

  // add transactions to the batch
  const transactionBatch = await primeSdk.addUserOpsToBatch({ to: recipient, value: ethers.utils.parseEther(value) });
  console.log('transactions: ', transactionBatch);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await primeSdk.estimate({
    paymasterDetails: {
      url: `${arka_url}?apiKey=${arka_api_key}&chainId=${chainId}`,
      context: { mode: 'multitoken', token: TOKEN_ADDRESS },
      type: PaymasterType.MULTITOKEN,
    },
  });
  // const op = await primeSdk.estimate();
  console.log('Estimate UserOp: ', op);

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
