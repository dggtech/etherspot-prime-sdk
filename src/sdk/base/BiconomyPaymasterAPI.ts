import { ethers } from 'ethers';
import { calcPreVerificationGas } from './calcPreVerificationGas';
import { PaymasterAPI } from './PaymasterAPI';
import { UserOperationStruct } from '../contracts/account-abstraction/contracts/core/BaseAccount';
import { SponsorUserOperationDto, createPaymaster } from '@biconomy/paymaster';

const DUMMY_PAYMASTER_AND_DATA =
  '0x0101010101010101010101010101010101010101000000000000000000000000000000000000000000000000000001010101010100000000000000000000000000000000000000000000000000000000000000000101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101';

export interface PaymasterResponse {
  result: {
    paymasterAndData: string;
    verificationGasLimit: string;
    preVerificationGas: string;
    callGasLimit: string;
  };
}

export class BiconomyPaymasterAPI extends PaymasterAPI {
  private paymasterUrl: string;
  private paymasterServiceData: SponsorUserOperationDto;

  constructor(paymasterUrl: string, paymasterServiceData: SponsorUserOperationDto) {
    super();
    this.paymasterUrl = paymasterUrl;
    this.paymasterServiceData = paymasterServiceData;
  }

  async getPaymasterAndData(userOp: Partial<UserOperationStruct>): Promise<PaymasterResponse> {
    // Hack: userOp includes empty paymasterAndData which calcPreVerificationGas requires.
    try {
      // userOp.preVerificationGas contains a promise that will resolve to an error.
      await ethers.utils.resolveProperties(userOp);
      // eslint-disable-next-line no-empty
    } catch (_) {}
    const pmOp: Partial<UserOperationStruct> = {
      sender: userOp.sender,
      nonce: userOp.nonce,
      initCode: userOp.initCode,
      callData: userOp.callData,
      callGasLimit: userOp.callGasLimit,
      verificationGasLimit: userOp.verificationGasLimit,
      maxFeePerGas: userOp.maxFeePerGas,
      maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
      // A dummy value here is required in order to calculate a correct preVerificationGas value.
      paymasterAndData: DUMMY_PAYMASTER_AND_DATA,
      signature: userOp.signature ?? '0x',
    };
    const op = await ethers.utils.resolveProperties(pmOp);
    op.preVerificationGas = calcPreVerificationGas(op);

    const biconomyPaymaster = await createPaymaster({
      paymasterUrl: this.paymasterUrl,
    }); // Found at https://dashboard.biconomy.io

    // Ask the paymaster to sign the transaction and return a valid paymasterAndData value.
    const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(op as any, this.paymasterServiceData);
    return {
      result: {
        ...(paymasterAndDataResponse as any),
      },
    };
  }
}

export const getVerifyingPaymaster = (paymasterUrl: string, paymasterServiceData: SponsorUserOperationDto) =>
  new BiconomyPaymasterAPI(paymasterUrl, paymasterServiceData);
