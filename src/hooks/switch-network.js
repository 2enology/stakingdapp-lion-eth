// eslint-disable-next-line import/prefer-default-export
export const switchSongbirdNetwork = async () => {
  const provider = window.ethereum;
  const songbirdChainId = "0x13";

  if (!provider) {
    // eslint-disable-next-line no-console
    console.log("Metamask is not installed, please install!");
  } else {
    const chainId = await provider.request({ method: "eth_chainId" });

    if (chainId === songbirdChainId) {
      // eslint-disable-next-line no-console
      console.log("Bravo!, you are on the correct network");
    } else {
      // eslint-disable-next-line no-console
      console.log("oulalal, switch to the correct network");
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: songbirdChainId }],
        });
        // eslint-disable-next-line no-console
        console.log("You have succefully switched to Binance Test network");
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          // eslint-disable-next-line no-console
          console.log(
            "This network is not available in your metamask, please add it"
          );
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13",
                  chainName: "Songbird Network",
                  rpcUrls: ["https://sgb.ftso.com.au/ext/bc/C/rpc"],
                  blockExplorerUrls: [
                    "https://songbird-explorer.flare.network",
                  ],
                  nativeCurrency: {
                    symbol: "SGB", // 2-6 characters long
                    decimals: 18,
                  },
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
            // eslint-disable-next-line no-console
            console.log(addError);
          }
        }
      }
    }
  }
};
