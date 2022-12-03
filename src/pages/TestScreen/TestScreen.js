import "../HomeScreen/HomeScreen.scss";

import SocialLogin, { getSocialLoginSDK } from "@biconomy/web3-auth";
import { ethers } from "ethers";
import SmartAccount from "@biconomy/smart-account";
import * as PushAPI from "@pushprotocol/restapi";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "2IOr8yekM9DNEVlKNQ3EV1fnHNH";
const projectSecret = "de3cee9e18b9b9eca199fd0313959caf";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

class WalletFunctions {
  constructor() {
    this.socialLoginSDK = new SocialLogin();
    this.wallet = null;
    this.signer = null;
    this.smartAddress = null;
  }
  async smartWallet() {
    const walletProvider = new ethers.providers.Web3Provider(
      this.socialLoginSDK.provider
    );
    console.log("walletProvider", walletProvider);
    // New instance, all config params are optional
    const wallet = new SmartAccount(walletProvider, {
      activeNetworkId: 5,
      supportedNetworksIds: [5],
      networkConfig: [
        {
          chainId: 5,
          dappAPIKey: "gUv-7Xh-M.aa270a76-a1aa-4e79-bab5-8d857161c561",
        },
      ],
    });
    console.log("wallet", wallet);
    this.socialLoginSDK.hideWallet();
    const smartAccount = await wallet.init();
    console.info("smartAccount", smartAccount);
    this.smartAddress = smartAccount.address;
    this.wallet = wallet;
    smartAccount.on("txHashGenerated", (response) => {
      console.log(
        "txHashGenerated event received in AddLP via emitter",
        response
      );
    });

    smartAccount.on("txHashChanged", (response) => {
      console.log(
        "txHashChanged event received in AddLP via emitter",
        response
      );
    });

    smartAccount.on("txMined", (response) => {
      console.log("txMined event received in AddLP via emitter", response);
    });

    smartAccount.on("error", (response) => {
      console.log("error event received in AddLP via emitter", response);
    });
  }

  async loginWallet() {
    await this.socialLoginSDK.init("0x5");
    this.socialLoginSDK.showConnectModal();
    this.socialLoginSDK.showWallet();

    if (!this.socialLoginSDK?.provider) return;
    const provider = new ethers.providers.Web3Provider(
      this.socialLoginSDK.provider
    );

    if (this.socialLoginSDK?.provider) {
      console.log("gg");
      const accounts = await provider.listAccounts();
      console.log("EOA address", accounts);

      const web3Provider = new ethers.providers.Web3Provider(
        this.socialLoginSDK.provider
      );
      const signer = web3Provider.getSigner();
      this.signer = signer;
      await this.smartWallet();
      return;
    }

    const sdk = await getSocialLoginSDK(ethers.utils.hexValue(5));
    sdk.showConnectModal();
    sdk.showWallet();
    await this.smartWallet();
  }

  async abiCall(abi, name, params, contract, value) {
    const erc721Interface = new ethers.utils.Interface(abi);
    const data = erc721Interface.encodeFunctionData(name, params);
    const tx1 = {
      to: contract,
      data,
      value: value
    };
    console.log(tx1)
    const txResponse = await this.wallet?.sendGasLessTransaction({
      transaction: tx1,
    });
    console.log(txResponse);
  }

  async batchCall(
    payerAbi,
    payerContract,
    recAddress,
    abi,
    name,
    params,
    contract
  ) {
    // const erc721Interface = new ethers.utils.Interface(abi);
    // const data = erc721Interface.encodeFunctionData(name, params);
    // const tx1 = {
    //   to: contract,
    //   data,
    // };

    const payerInterface = new ethers.utils.Interface(payerAbi);
    const payerData = payerInterface.encodeFunctionData("approve", [
      "0xd4e3cec407cd36d9e3767cd189cccafbf549202c",
      "0",
    ]);
    const tx2 = {
      to: payerContract,
      data: payerData,
    };

    console.log("approve calldata: ", tx2);
    // debugger;

    const txResponse = await this.wallet?.sendGaslessTransactionBatch({
      transactions: [tx2],
    });
    console.log(txResponse);
  }
}

export default function TestScreen() {
  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "string",
          name: "uri",
          type: "string",
        },
      ],
      name: "safeMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const daiAbi = [
    {
      inputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "symbol", type: "string" },
        { internalType: "uint8", name: "decimals", type: "uint8" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
      name: "mint",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const pushprotocolAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "channel",
          type: "address",
        },
        {
          indexed: true,
          internalType: "enum EPNSCoreDevV1.ChannelType",
          name: "channelType",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "identity",
          type: "bytes",
        },
      ],
      name: "AddChannel",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "channel",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_subGraphData",
          type: "bytes",
        },
      ],
      name: "AddSubGraph",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "channel",
          type: "address",
        },
      ],
      name: "ChannelBlocked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_channel",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalNotifOptions",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_notifSettings",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_notifDescription",
          type: "string",
        },
      ],
      name: "ChannelNotifcationSettingsAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "channel",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "revoker",
          type: "address",
        },
      ],
      name: "ChannelVerificationRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "channel",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "verifier",
          type: "address",
        },
      ],
      name: "ChannelVerified",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "channel",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amountRefunded",
          type: "uint256",
        },
      ],
      name: "DeactivateChannel",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "channel",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amountDeposited",
          type: "uint256",
        },
      ],
      name: "ReactivateChannel",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "channel",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "identity",
          type: "bytes",
        },
      ],
      name: "UpdateChannel",
      type: "event",
    },
    {
      inputs: [],
      name: "ADD_CHANNEL_MIN_FEES",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ADD_CHANNEL_MIN_POOL_CONTRIBUTION",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "CHANNEL_DEACTIVATION_FEES",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "POOL_FUNDS",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PROTOCOL_POOL_FEES",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PUSH_TOKEN_ADDRESS",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "REFERRAL_CODE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "UNISWAP_V2_ROUTER",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "WETH_ADDRESS",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "aDaiAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes", name: "_subGraphData", type: "bytes" }],
      name: "addSubGraph",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_startIndex", type: "uint256" },
        { internalType: "uint256", name: "_endIndex", type: "uint256" },
        {
          internalType: "address[]",
          name: "_channelList",
          type: "address[]",
        },
      ],
      name: "batchRevokeVerification",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_startIndex", type: "uint256" },
        { internalType: "uint256", name: "_endIndex", type: "uint256" },
        {
          internalType: "address[]",
          name: "_channelList",
          type: "address[]",
        },
      ],
      name: "batchVerification",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_channelAddress",
          type: "address",
        },
      ],
      name: "blockChannel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "channelById",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "channelNotifSettings",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "channels",
      outputs: [
        {
          internalType: "enum EPNSCoreDevV1.ChannelType",
          name: "channelType",
          type: "uint8",
        },
        { internalType: "uint8", name: "channelState", type: "uint8" },
        { internalType: "address", name: "verifiedBy", type: "address" },
        {
          internalType: "uint256",
          name: "poolContribution",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "channelHistoricalZ",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "channelFairShareCount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "channelLastUpdate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "channelStartBlock",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "channelUpdateBlock",
          type: "uint256",
        },
        { internalType: "uint256", name: "channelWeight", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "channelsCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "createChannelForPushChannelAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_notifOptions", type: "uint256" },
        { internalType: "string", name: "_notifSettings", type: "string" },
        {
          internalType: "string",
          name: "_notifDescription",
          type: "string",
        },
      ],
      name: "createChannelSettings",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum EPNSCoreDevV1.ChannelType",
          name: "_channelType",
          type: "uint8",
        },
        { internalType: "bytes", name: "_identity", type: "bytes" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "createChannelWithFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "daiAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amountsOutValue",
          type: "uint256",
        },
      ],
      name: "deactivateChannel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "epnsCommunicator",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_channel", type: "address" }],
      name: "getChannelState",
      outputs: [{ internalType: "uint256", name: "state", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_channel", type: "address" }],
      name: "getChannelVerfication",
      outputs: [
        { internalType: "uint8", name: "verificationStatus", type: "uint8" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "governance",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "groupFairShareCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "groupHistoricalZ",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "groupLastUpdate",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "groupNormalizedWeight",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_pushChannelAdmin",
          type: "address",
        },
        {
          internalType: "address",
          name: "_pushTokenAddress",
          type: "address",
        },
        { internalType: "address", name: "_wethAddress", type: "address" },
        {
          internalType: "address",
          name: "_uniswapRouterAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lendingPoolProviderAddress",
          type: "address",
        },
        { internalType: "address", name: "_daiAddress", type: "address" },
        { internalType: "address", name: "_aDaiAddress", type: "address" },
        { internalType: "uint256", name: "_referralCode", type: "uint256" },
      ],
      name: "initialize",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "isMigrationComplete",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lendingPoolProviderAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_startIndex", type: "uint256" },
        { internalType: "uint256", name: "_endIndex", type: "uint256" },
        {
          internalType: "address[]",
          name: "_channelAddresses",
          type: "address[]",
        },
        {
          internalType: "enum EPNSCoreDevV1.ChannelType[]",
          name: "_channelTypeList",
          type: "uint8[]",
        },
        { internalType: "bytes[]", name: "_identityList", type: "bytes[]" },
        {
          internalType: "uint256[]",
          name: "_amountList",
          type: "uint256[]",
        },
      ],
      name: "migrateChannelData",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pushChannelAdmin",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "reactivateChannel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_newFees", type: "uint256" }],
      name: "setChannelDeactivationFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_commAddress", type: "address" },
      ],
      name: "setEpnsCommunicatorAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_governanceAddress",
          type: "address",
        },
      ],
      name: "setGovernanceAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "setMigrationComplete",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_newFees", type: "uint256" }],
      name: "setMinChannelCreationFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_newAdmin", type: "address" }],
      name: "transferPushChannelAdminControl",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_channel", type: "address" }],
      name: "unverifyChannel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_channel", type: "address" },
        { internalType: "bytes", name: "_newIdentity", type: "bytes" },
      ],
      name: "updateChannelMeta",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_newAddress", type: "address" },
      ],
      name: "updateUniswapRouterAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_newAddress", type: "address" },
      ],
      name: "updateWETHAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_channel", type: "address" }],
      name: "verifyChannel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const channelData = {
    name: "Eventix123",
    info: "just for testing",
    icon: "data:image/jpeg;base64,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",
    url: "https://eventix.timepass.dev",
  };

  const address = "0x3a8ce47526b3733bf32AA0f7B20c279dE79D31Fb";
  const daiAddress = "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33";
  const pushAddressBase = "0x2Ad196320182cFd3C6d5E1b7eaBB29382B9Fa743";
  const pushAddress = "0xd4e3cec407cd36d9e3767cd189cccafbf549202c";
  const ease = new WalletFunctions();
  const walletConnect = async () => {
    console.log("Clicked on connect wallet");
    await ease.loginWallet();

    // const resp = await ipfs.add(JSON.stringify(channelData));
    // console.log("IPFS", resp);
    // const bytes = ethers.utils.hexlify(
    //   ethers.utils.toUtf8Bytes(`1+${resp.cid}`)
    // );
    // console.log(bytes);
    // await ease.abiCall(
    //   daiAbi,
    //   "approve",
    //   [pushAddress, "50000000000000000000"],
    //   daiAddress
    // );

    // await ease.abiCall(
    //   pushprotocolAbi,
    //   "createChannelWithFees",
    //   [2, bytes, "50000000000000000000"],
    //   pushAddress
    // );

    // await ease.batchCall(
    //   daiAbi,
    //   daiAddress,
    //   ease.smartAddress,
    //   daiAbi,
    //   "mint",
    //   ["50000000000000000000"],
    //   daiAddress
    // );
    // await ease.abiCall(
    //   pushprotocolAbi,
    //   "createChannelWithFees",
    //   [2, bytes, "50000000000000000000"],
    //   pushAddress
    // );

    await ease.batchCall(daiAbi, daiAddress, "", daiAbi, "", [], pushAddress)

  };

  const sendNotification = async () => {
    await ease.loginWallet();
    const ggwp = ease.wallet;
    const sa = ease.smartAddress;
    console.log(ggwp);
    const apiResponse = await PushAPI.payloads.sendNotification({
      ggwp,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `[SDK-TEST] notification TITLE:`,
        body: `[sdk-test] notification BODY`,
      },
      payload: {
        title: `[sdk-test] payload title`,
        body: `sample msg body`,
        cta: "",
        img: "",
      },
      channel: `eip155:5:${sa}`, // your channel address
      env: "staging",
    });
    console.log(apiResponse);
  };

  const mintStuff = async () => {
    await ease.loginWallet();
    const tokenAbi = [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      { inputs: [], name: "ApprovalCallerNotOwnerNorApproved", type: "error" },
      { inputs: [], name: "ApprovalQueryForNonexistentToken", type: "error" },
      { inputs: [], name: "ApprovalToCurrentOwner", type: "error" },
      { inputs: [], name: "ApproveToCaller", type: "error" },
      { inputs: [], name: "BalanceQueryForZeroAddress", type: "error" },
      { inputs: [], name: "MintToZeroAddress", type: "error" },
      { inputs: [], name: "MintZeroQuantity", type: "error" },
      { inputs: [], name: "OwnerQueryForNonexistentToken", type: "error" },
      { inputs: [], name: "TransferCallerNotOwnerNorApproved", type: "error" },
      { inputs: [], name: "TransferFromIncorrectOwner", type: "error" },
      {
        inputs: [],
        name: "TransferToNonERC721ReceiverImplementer",
        type: "error",
      },
      { inputs: [], name: "TransferToZeroAddress", type: "error" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
        ],
        name: "Initialized",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "previousAdminRole",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "newAdminRole",
            type: "bytes32",
          },
        ],
        name: "RoleAdminChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleGranted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleRevoked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "ADMIN_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "NAME",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "ROYALTIES_BASIS",
        outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "VERSION",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "availableSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "contractURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getInfo",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "version", type: "uint256" },
              {
                components: [
                  { internalType: "string", name: "name", type: "string" },
                  { internalType: "string", name: "symbol", type: "string" },
                  { internalType: "address", name: "owner", type: "address" },
                  {
                    internalType: "uint256",
                    name: "maxSupply",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "reservedSupply",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "tokensPerMint",
                    type: "uint256",
                  },
                  {
                    internalType: "address payable",
                    name: "treasuryAddress",
                    type: "address",
                  },
                ],
                internalType: "struct NFTCollection.DeploymentConfig",
                name: "deploymentConfig",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "string", name: "baseURI", type: "string" },
                  {
                    internalType: "bool",
                    name: "metadataUpdatable",
                    type: "bool",
                  },
                  {
                    internalType: "uint256",
                    name: "publicMintPrice",
                    type: "uint256",
                  },
                  {
                    internalType: "bool",
                    name: "publicMintPriceFrozen",
                    type: "bool",
                  },
                  {
                    internalType: "uint256",
                    name: "presaleMintPrice",
                    type: "uint256",
                  },
                  {
                    internalType: "bool",
                    name: "presaleMintPriceFrozen",
                    type: "bool",
                  },
                  {
                    internalType: "uint256",
                    name: "publicMintStart",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "presaleMintStart",
                    type: "uint256",
                  },
                  {
                    internalType: "string",
                    name: "prerevealTokenURI",
                    type: "string",
                  },
                  {
                    internalType: "bytes32",
                    name: "presaleMerkleRoot",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint256",
                    name: "royaltiesBps",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "royaltiesAddress",
                    type: "address",
                  },
                ],
                internalType: "struct NFTCollection.RuntimeConfig",
                name: "runtimeConfig",
                type: "tuple",
              },
            ],
            internalType: "struct NFTCollection.ContractInfo",
            name: "info",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
        name: "getRoleAdmin",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "hasRole",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              { internalType: "string", name: "symbol", type: "string" },
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "uint256", name: "maxSupply", type: "uint256" },
              {
                internalType: "uint256",
                name: "reservedSupply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tokensPerMint",
                type: "uint256",
              },
              {
                internalType: "address payable",
                name: "treasuryAddress",
                type: "address",
              },
            ],
            internalType: "struct NFTCollection.DeploymentConfig",
            name: "deploymentConfig",
            type: "tuple",
          },
          {
            components: [
              { internalType: "string", name: "baseURI", type: "string" },
              { internalType: "bool", name: "metadataUpdatable", type: "bool" },
              {
                internalType: "uint256",
                name: "publicMintPrice",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "publicMintPriceFrozen",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "presaleMintPrice",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "presaleMintPriceFrozen",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "publicMintStart",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "presaleMintStart",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "prerevealTokenURI",
                type: "string",
              },
              {
                internalType: "bytes32",
                name: "presaleMerkleRoot",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "royaltiesBps",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "royaltiesAddress",
                type: "address",
              },
            ],
            internalType: "struct NFTCollection.RuntimeConfig",
            name: "runtimeConfig",
            type: "tuple",
          },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "wallet", type: "address" },
          { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
        ],
        name: "isWhitelisted",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "metadataUpdatable",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "mintingActive",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "prerevealTokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "presaleActive",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "presaleMerkleRoot",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
        ],
        name: "presaleMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "presaleMintPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "presaleMintStart",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "publicMintPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "publicMintStart",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "reserveMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "reserveRemaining",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "reservedSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "salePrice", type: "uint256" },
        ],
        name: "royaltyInfo",
        outputs: [
          { internalType: "address", name: "receiver", type: "address" },
          { internalType: "uint256", name: "royaltyAmount", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bytes", name: "_data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "tokensPerMint",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "to", type: "address" }],
        name: "transferAdminRights",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "treasuryAddress",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              { internalType: "string", name: "baseURI", type: "string" },
              { internalType: "bool", name: "metadataUpdatable", type: "bool" },
              {
                internalType: "uint256",
                name: "publicMintPrice",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "publicMintPriceFrozen",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "presaleMintPrice",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "presaleMintPriceFrozen",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "publicMintStart",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "presaleMintStart",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "prerevealTokenURI",
                type: "string",
              },
              {
                internalType: "bytes32",
                name: "presaleMerkleRoot",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "royaltiesBps",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "royaltiesAddress",
                type: "address",
              },
            ],
            internalType: "struct NFTCollection.RuntimeConfig",
            name: "newConfig",
            type: "tuple",
          },
        ],
        name: "updateConfig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawFees",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const tokenAddress = "0x2f3bbad37e59a203139df8888bd35d6c08630953";

    await ease.abiCall(tokenAbi, "mint", ["1"], tokenAddress, "10000000000000000")

  };
  return (
    <div className="homescreen">
      <button onClick={walletConnect}>Connect Wallet</button>
      <br />
      <button onClick={sendNotification}>Send Notification</button>
      <br />
      <button onClick={mintStuff}>Mint Stuff</button>
    </div>
  );
}
