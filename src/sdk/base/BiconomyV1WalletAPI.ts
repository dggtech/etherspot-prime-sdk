import { BigNumber, BigNumberish, Contract, ethers } from 'ethers';
import { arrayify, hexConcat } from 'ethers/lib/utils';
import { BaseApiParams, BaseAccountAPI } from './BaseAccountAPI';
import { BiconomyV1Abi } from '../contracts/BiconomyV1/BiconomyV1Abi';
import { BiconomyV1FactoryAbi } from '../contracts/BiconomyV1/BiconomyV1FactoryAbi';

/**
 * constructor params, added no top of base params:
 * @param owner the signer object for the account owner
 * @param factoryAddress address of contract "factory" to deploy new contracts (not needed if account already deployed)
 * @param index nonce value used when creating multiple accounts for the same owner
 */
export interface BiconomyV1WalletApiParams extends BaseApiParams {
  factoryAddress?: string;
  index?: number;
}

/**
 * An implementation of the BaseAccountAPI using the BiconomyV1Wallet contract.
 * - contract deployer gets "entrypoint", "owner" addresses and "index" nonce
 * - owner signs requests using normal "Ethereum Signed Message" (ether's signer.signMessage())
 * - nonce method is "nonce()"
 * - execute method is "execFromEntryPoint()"
 */

export class BiconomyV1WalletAPI extends BaseAccountAPI {
  factoryAddress?: string;
  index: number;
  accountAddress?: string;

  /**
   * our account contract.
   * should support the "execFromEntryPoint" and "nonce" methods
   */
  accountContract?: Contract;

  factory?: Contract;

  constructor(params: BiconomyV1WalletApiParams) {
    super(params);
    this.factoryAddress = params.factoryAddress;
    this.index = params.index ?? 0;
  }

  async _getAccountContract(): Promise<Contract> {
    this.accountContract = new ethers.Contract(this.accountAddress, BiconomyV1Abi, this.provider);
    return this.accountContract;
  }

  async getAccountInitCode(): Promise<string> {
    this.factory = new ethers.Contract(this.factoryAddress, BiconomyV1FactoryAbi, this.provider);
    return hexConcat([
      this.factoryAddress,
      this.factory.interface.encodeFunctionData('deployCounterFactualAccount', [
        this.services.walletService.EOAAddress,
        this.index,
      ]),
    ]);
  }

  async getNonce(key = 0): Promise<BigNumber> {
    if (await this.checkAccountPhantom()) {
      return BigNumber.from(0);
    }
    return await this.nonceManager.getNonce(await this.getAccountAddress(), key);
  }

  /**
   * encode a method call from entryPoint to our contract
   * @param target
   * @param value
   * @param data
   */
  async encodeExecute(target: string, value: BigNumberish, data: string): Promise<string> {
    const accountContract = await this._getAccountContract();
    return accountContract.interface.encodeFunctionData('executeCall', [target, value, data]);
  }

  async signUserOpHash(userOpHash: string): Promise<string> {
    const signature = await this.services.walletService.signMessage(arrayify(userOpHash));
    return signature;
  }

  get epView() {
    return this.entryPointView;
  }

  async encodeBatch(targets: string[], values: BigNumberish[], datas: string[]): Promise<string> {
    const accountContract = await this._getAccountContract();
    return accountContract.interface.encodeFunctionData('executeBatchCall', [targets, values, datas]);
  }
}
