import { readContract, writeContract } from "@wagmi/core";
import { Address, keccak256, toHex, zeroAddress } from "viem";

const ContractExceptions = {
  4001: "Transaction has been rejected.",
  "CODE_TAKEN": "Voucher code is already taken.",
  "WRONG_SECRET": "Wrong passphrase."
}

const parseException = (ex) => {
  const exceptionCode = ex.cause.code;
  const contractExceptionReason = ex.details.split("ETVH: ")[1];
  if(exceptionCode in ContractExceptions)
    return { success: false, message: ContractExceptions[exceptionCode]};
  if(contractExceptionReason in ContractExceptions)
    return { success: false, message: ContractExceptions[contractExceptionReason]};
  
  return { success: false, message: "Unknown error"};
}

export class Voucher {
  code: string;
  redemptionHash: string;
  value: bigint;
  isActive: boolean;
  claimedBy: Address;
  claimExpiresAt: bigint;
  claimFee: bigint;

  constructor(voucherData) {
    this.redemptionHash = voucherData.redemptionHash;
    this.value = voucherData.voucherValue;
    this.isActive = voucherData.isActive;
    this.claimedBy = voucherData.claimedBy;
    this.claimExpiresAt = voucherData.claimExpiresAt;
    this.claimFee = voucherData.claimFee;
  }
};

export const CVoucher = {
  address: process.env.NEXT_PUBLIC_CVOUCHER_CONTRACT,
  
  read: async(fn: string, args: [any]|undefined = undefined) => {
    return await readContract({
      address: CVoucher.address as Address,
      abi: cvoucherAbi,
      functionName: fn,
      args: args
    }) as Promise<any>
  },
  write: async(fn: string, args: any[]|undefined = undefined, value: bigint = BigInt(0)) => {
    await writeContract({
      address: CVoucher.address as Address,
      abi: cvoucherAbi,
      functionName: fn,
      args: args,
      value: value
    })
  },
  name: async(): Promise<string> =>  {
    return await CVoucher.read("name");
  },
  getVoucher: async(code): Promise<Voucher> => {
    let voucher = new Voucher(await CVoucher.read("getEthVoucher", [code]));
    voucher.code = code;
    return voucher;
  },
  createVoucher: async(code, passphrase, value, claimFee): Promise<object> => {
    try{
      await writeContract({
        address: CVoucher.address as Address,
        abi: cvoucherAbi,
        functionName: "createEthVoucher",
        args: [code, passphrase, claimFee],
        value: value
      });

      return { success: true, message: "Voucher generated!"};
    } catch(ex) {
      return parseException(ex);
    }
  },
  claimVoucher: async(code, claimFee): Promise<object> => {
    try{
      await CVoucher.write("claimEthRedemption", [keccak256(code)], claimFee);
      return { success: true, message: "Voucher claimed!"}
    } catch(ex){
      console.debug("ERROR ON CLAIM");
      console.debug(ex);
      return { success: false, message: "Failed to claim voucher" };
    }
  },
  redeemVoucher: async(code, passphrase): Promise<object> => {
    try{
      await CVoucher.write("redeemEthVoucher", [keccak256(code), passphrase]);
      return { success: true, message: "Voucher redeemed."}
    } catch(ex){
      return parseException(ex);
    }
  },
  creationFee: async(): Promise<object> => {
    try{
      const createVoucherEthFeesMin = await CVoucher.read("createVoucherEthFeesMin");
      const createVoucherEthFees = await CVoucher.read("createVoucherEthFees");
      return { success: true, message: "", data: {fees: createVoucherEthFees, minFees: createVoucherEthFeesMin }};
    } catch(ex){
      console.debug("ERROR ON CREATION FEE");
      console.debug(ex);
      return { success: false, message: "Failed to get voucher creation fee." };
    }
  }
}

const cvoucherAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "beacon",
        "type": "address"
      }
    ],
    "name": "BeaconUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "VoucherCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "VoucherRedeemed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "FEE_DIVISOR",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "voucherCode",
        "type": "bytes32"
      }
    ],
    "name": "claimEthRedemption",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimPeriod",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "voucherCode",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "redemptionHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint128",
        "name": "claimFee",
        "type": "uint128"
      }
    ],
    "name": "createEthVoucher",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createVoucherEthFees",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createVoucherEthFeesMin",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeReceiver",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "voucherCode",
        "type": "string"
      }
    ],
    "name": "getEthVoucher",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "redemptionHash",
            "type": "bytes32"
          },
          {
            "internalType": "uint120",
            "name": "voucherValue",
            "type": "uint120"
          },
          {
            "internalType": "uint120",
            "name": "claimFee",
            "type": "uint120"
          },
          {
            "internalType": "uint16",
            "name": "isActive",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "claimedBy",
            "type": "address"
          },
          {
            "internalType": "uint64",
            "name": "claimExpiresAt",
            "type": "uint64"
          },
          {
            "internalType": "uint32",
            "name": "expiredClaims",
            "type": "uint32"
          }
        ],
        "internalType": "struct CVoucher.NativeVoucherUnpacked",
        "name": "voucher",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "voucherCode",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "secret",
        "type": "string"
      }
    ],
    "name": "redeemEthVoucher",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_feeReceiver",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_createVoucherEthFeesMin",
        "type": "uint128"
      },
      {
        "internalType": "uint16",
        "name": "_createVoucherEthFees",
        "type": "uint16"
      },
      {
        "internalType": "uint64",
        "name": "_claimPeriod",
        "type": "uint64"
      }
    ],
    "name": "updateSettings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      }
    ],
    "name": "upgradeTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "vouchers",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "redemptionHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "valueClaimFeeActive",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "claimedByExpiresAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]