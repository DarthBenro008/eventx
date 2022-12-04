import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.REACT_APP_INFURA_PROJECT;
const projectSecret = process.REACT_APP_INFURA_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

const Ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

export default Ipfs;
