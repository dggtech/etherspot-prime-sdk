import { SponsorUserOperationDto } from '@biconomy/paymaster';
import { BundlerProviderLike } from './bundler';
import { StateStorage } from './state';

export enum PaymasterType {
  BICONOMY = 'biconomy',
  PIMLICO = 'pimlico',
}

export interface PaymasterApi {
  url: string;
  type?: PaymasterType;
  context?: any;
  paymasterServiceData?: SponsorUserOperationDto;
}

export enum Factory {
  ZERO_DEV = 'zeroDev',
  ETHERSPOT = 'etherspot',
  SIMPLE_ACCOUNT = 'simpleAccount',
}

export interface SdkOptions {
  chainId: number;
  bundlerProvider?: BundlerProviderLike;
  stateStorage?: StateStorage;
  rpcProviderUrl?: string;
  factoryWallet?: Factory;
  walletFactoryAddress?: string;
  entryPointAddress?: string;
  accountAddress?: string;
  index?: number;
}
