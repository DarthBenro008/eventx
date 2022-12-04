import SocialLogin, { getSocialLoginSDK } from "@biconomy/web3-auth";
import { ethers } from "ethers";
import SmartAccount from "@biconomy/smart-account";

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
      value: value,
    };
    console.log(tx1);
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
    const payerInterface = new ethers.utils.Interface(payerAbi);
    const payerData = payerInterface.encodeFunctionData("approve", [
      recAddress,
      "0",
    ]);
    const tx1 = {
      to: payerContract,
      data: payerData,
    };

    const contractInterface = new ethers.utils.Interface(abi);
    const data = contractInterface.encodeFunctionData(name, params);
    const tx2 = {
      to: contract,
      data,
    };

    console.log("approve calldata: ", tx2);
    const txResponse = await this.wallet?.sendGaslessTransactionBatch({
      transactions: [tx1, tx2],
    });
    console.log(txResponse);
  }
}

export default WalletFunctions;
