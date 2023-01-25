import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../hooks/connect";
import { switchSongbirdNetwork } from "../../hooks/switch-network";

import { FaWallet } from "react-icons/fa";
import logoIMG from "../../assets/images/logoIMG.png";

export default function Header() {
  const { account, chainId, activate, deactivate } = useWeb3React();

  async function connect() {
    if (chainId !== 19 || chainId === undefined) {
      switchSongbirdNetwork();
    }
    try {
      console.log("clicked");
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header
        id="header"
        className="flex justify-between lg:px-10 md:px-20 mt-5 px-5 sm:px-10 w-full xl:px-40 z-50">
        <a className="flex logo" href="/">
          <img src={logoIMG} alt="logoIMG" className="w-14" />
          <h1 className="hidden mt-3 sm:block text-white text-xl">Lion NFTs</h1>
        </a>
        {!account ? (
          <button
            variant="hovered"
            className="bg-gray-100 duration-300 flex hover:bg-green-700 hover:text-white pt-4 px-3 rounded-2xl text-md"
            onClick={() => connect()}>
            <FaWallet className="mr-2 mt-1" /> Connect Wallet
          </button>
        ) : (
          <button
            variant="hovered"
            className="bg-gray-100 duration-300 flex hover:bg-green-700 hover:text-white pt-4 px-4 rounded-2xl text-md"
            onClick={() => disconnect()}>
            <FaWallet className="mr-2 mt-1" />
            {account.toString().slice(0, 4)} .... {account.toString().slice(-4)}
          </button>
        )}
      </header>
    </>
  );
}
