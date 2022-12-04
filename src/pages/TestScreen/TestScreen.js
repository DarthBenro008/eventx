import "../HomeScreen/HomeScreen.scss";
import * as PushAPI from "@pushprotocol/restapi";
import { useEffect } from "react";

import { EmbedSDK } from "@pushprotocol/uiembed";

export default function TestScreen() {
  useEffect(() => {
    EmbedSDK.init({
      headerText: "Hello DeFi", // optional
      targetID: "sdk-trigger-id", // mandatory
      appName: "consumerApp", // mandatory
      user: "0x4c3c7169D3B6EAB505950e9734921E163574eB90", // mandatory
      chainId: 5, // mandatory
      viewOptions: {
        type: "modal", // optional [default: 'sidebar', 'modal']
        showUnreadIndicator: true, // optional
        unreadIndicatorColor: "#cc1919",
        unreadIndicatorPosition: "bottom-right",
      },
      theme: "light",
      onOpen: () => {
        console.log("-> client dApp onOpen callback");
      },
      onClose: () => {
        console.log("-> client dApp onClose callback");
      },
    });

    return () => {
      EmbedSDK.cleanup();
    };
  }, []);

  return (
    <div className="homescreen">
      <button id="sdk-trigger-id">Connect Wallet</button>
      <br />
      <button>Send Notification</button>
      <br />
      <button>Mint Stuff</button>
    </div>
  );
}
