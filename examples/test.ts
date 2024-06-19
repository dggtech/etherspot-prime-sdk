import { ethers } from 'ethers';

const data = {
  to: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
  from: '0x319fe457676941EA433770802c3e5Ac6FFAA401A',
  contractAddress: null,
  transactionIndex: 1,
  gasUsed: {
    type: 'BigNumber',
    hex: '0x029e6b',
  },
  logsBloom:
    '0x00040000000000000400000000000000000000000080000000000a00000040000008000000000000000200010000000000100000002000000000020200002000000000000000000000000008000000000000100000000000000000000000000000000000080000000000000000000000208200000200000000000010000000000000020000400000000000008200200000000000000000001000810000000008000000000000000000400000000000000000000020000000000802000000000000000082000000000005000000000100008000000008000000000000000000000000000000000000000000001000000000000000000000000000080000002000',
  blockHash: '0xfffa0072887ed51fd788fe7a6d1406fb52961116108538f24a350366f4cde3c5',
  transactionHash: '0x882f759e7e19de90921e97fa984012008587aac16c1591c487d67e8b7c8a2041',
  logs: [
    {
      transactionIndex: 1,
      blockNumber: 7474262,
      transactionHash: '0x882f759e7e19de90921e97fa984012008587aac16c1591c487d67e8b7c8a2041',
      address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      topics: ['0xbb47ee3e183a558b1a2ff0874b079f3fc5478b7454eacf2bfc5af2ff5878f972'],
      data: '0x',
      logIndex: 0,
      blockHash: '0xfffa0072887ed51fd788fe7a6d1406fb52961116108538f24a350366f4cde3c5',
    },
    {
      transactionIndex: 1,
      blockNumber: 7474262,
      transactionHash: '0x882f759e7e19de90921e97fa984012008587aac16c1591c487d67e8b7c8a2041',
      address: '0xf9fb2Bb596244DAc1fb201ee8B5085Fc479eCEfd',
      topics: [
        '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
        '0x000000000000000000000000662a73ebad68246e9832ec4d914f8399c0bfcc0f',
        '0x000000000000000000000000662a73ebad68246e9832ec4d914f8399c0bfcc0f',
        '0x0000000000000000000000008be0bf9b594b7275fbeae19ce641fb27beb90b56',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001',
      logIndex: 1,
      blockHash: '0xfffa0072887ed51fd788fe7a6d1406fb52961116108538f24a350366f4cde3c5',
    },
    {
      transactionIndex: 1,
      blockNumber: 7474262,
      transactionHash: '0x882f759e7e19de90921e97fa984012008587aac16c1591c487d67e8b7c8a2041',
      address: '0x453478E2E0c846c069e544405d5877086960BEf2',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000662a73ebad68246e9832ec4d914f8399c0bfcc0f',
        '0x000000000000000000000000e85649152d15825f2226b2d9c49c07b1cd2b36c7',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000000100ffc',
      logIndex: 2,
      blockHash: '0xfffa0072887ed51fd788fe7a6d1406fb52961116108538f24a350366f4cde3c5',
    },
    {
      transactionIndex: 1,
      blockNumber: 7474262,
      transactionHash: '0x882f759e7e19de90921e97fa984012008587aac16c1591c487d67e8b7c8a2041',
      address: '0xe85649152D15825F2226B2d9C49c07b1cd2b36C7',
      topics: [
        '0x7c405b9cef9e824a5cf31a09e7b8810d01d9db34ee384388f33b438608807e1a',
        '0x000000000000000000000000662a73ebad68246e9832ec4d914f8399c0bfcc0f',
        '0x000000000000000000000000453478e2e0c846c069e544405d5877086960bef2',
        '0x0000000000000000000000000000000000000000000000000000000000100ffc',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000118c309039f820b4d808f3951ea25ac02c29f10df94b76babc5bd04310958fccc6676900000000000000000000000000000000000000000000000000000000b8b6fcc00000000000000000000000000000000000000000000000000000000000000000',
      logIndex: 3,
      blockHash: '0xfffa0072887ed51fd788fe7a6d1406fb52961116108538f24a350366f4cde3c5',
    },
    {
      transactionIndex: 1,
      blockNumber: 7474262,
      transactionHash: '0x882f759e7e19de90921e97fa984012008587aac16c1591c487d67e8b7c8a2041',
      address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      topics: [
        '0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f',
        '0x9039f820b4d808f3951ea25ac02c29f10df94b76babc5bd04310958fccc66769',
        '0x000000000000000000000000662a73ebad68246e9832ec4d914f8399c0bfcc0f',
        '0x000000000000000000000000e85649152d15825f2226b2d9c49c07b1cd2b36c7',
      ],
      data: '0x000000000000000000000000000000000000000000000000000000000000005300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000eccb54b627f0000000000000000000000000000000000000000000000000000000000002a604',
      logIndex: 4,
      blockHash: '0xfffa0072887ed51fd788fe7a6d1406fb52961116108538f24a350366f4cde3c5',
    },
  ],
  blockNumber: 7474262,
  confirmations: 1,
  cumulativeGasUsed: {
    type: 'BigNumber',
    hex: '0x034986',
  },
  effectiveGasPrice: {
    type: 'BigNumber',
    hex: '0x59682ffc',
  },
  status: 1,
  type: 2,
  byzantium: true,
};

const log = data.logs[1];

// const transferSingleEventAbi = [
//   'event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)',
// ];

const erc1155Abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'TransferBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'TransferSingle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'URI',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'accounts',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
    ],
    name: 'balanceOfBatch',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'uri',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

(async () => {
  const log = data.logs[1];
  const iface = new ethers.utils.Interface(erc1155Abi);

  const parsedLog = iface.parseLog(log);

  console.log(`Operator: ${parsedLog.args.operator}`);
  console.log(`From: ${parsedLog.args.from}`);
  console.log(`To: ${parsedLog.args.to}`);
  console.log(`ID: ${parsedLog.args.id.toString()}`);
  console.log(`Value: ${parsedLog.args.value.toString()}`);

  if ([].length) {
    console.log('Empty array');
  }
})();
