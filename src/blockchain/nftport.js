class NFTPortUtilities {
  async mintCollection(
    tokenName,
    tokenPrice,
    ownerAddress,
    symbol,
    max_supply
  ) {
    const body = {
      team_reserve: 0,
      chain: "goerli",
      name: tokenName,
      symbol: symbol,
      max_supply: max_supply,
      tokens_per_mint: 1,
      owner_address: ownerAddress,
      treasury_address: ownerAddress,
      public_mint_start_date: "2022-12-03T23:20:24+00:00",
      mint_price: tokenPrice,
    };

    const options = this.optionsCreator("POST");
    options.body = JSON.stringify(body);
    const data = await this.executeCall(
      "https://api.nftport.xyz/v0/contracts/collections",
      options
    );
    return data;
  }

  optionsCreator(method) {
    return {
      method: method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: process.env.REACT_APP_NFTPORT,
      },
    };
  }

  async executeCall(endpoint, options) {
    try {
      const results = await fetch(endpoint, options);
      const jsonData = await results.json();
      return jsonData;
    } catch (e) {
      console.log("Error contacting NFTPort", e);
    }
  }

  async getContractAbi(address) {
    const options = this.optionsCreator("GET");
    const data = this.executeCall(
      `https://api.nftport.xyz/v0/me/contracts/abis/${address}?chain=goerli`,
      options
    );
    return data;
  }
}

export default NFTPortUtilities;
