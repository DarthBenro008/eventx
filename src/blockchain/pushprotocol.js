import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";

class PushProtocolUtilities {
  constructor() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.provider = provider;
  }

  async fetchAccounts() {
    const accounts = await this.provider.listAccounts();
    this.account = accounts[0];
  }

  async fetchNotifications() {
    const notifications = await PushAPI.user.getFeeds({
      user: `eip155:5:${this.account}`,
      env: "staging",
    });
    return notifications;
  }

  async optIn(address) {
    const signer = this.provider.getSigner();
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: `eip155:5:${address}`,
      userAddress: `eip155:5:${this.account}`,
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  }

  optIn(address) {}
}
