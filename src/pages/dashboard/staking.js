import { useState, useEffect } from "react";
import Countdown from "react-countdown";

import Button from "../common/button";
import SliderNFT from "./Slider";

import MintStyleWrapper from "./staking.style";

import checkIcon from "../../assets/images/icon/mint-right-text-icon.svg";
import discordIcon from "../../assets/images/icon/dis_logo.svg";
import twitterIcon from "../../assets/images/icon/Twitter.svg";
import { GooSpinner } from "react-spinners-kit";

import config from "../../config/config";
import ROYALPETSABI from "../../assets/abis/royalPetsABI.json";
import CARETOKENABI from "../../assets/abis/careTokenABI.json";
import { useWeb3React } from "@web3-react/core";
const ethers = require("ethers");

const Staking = () => {
  const { account } = useWeb3React();

  const [whiteListState, setWhiteListState] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [mintCount, setMintCount] = useState(0);
  const [mintState, setMintState] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = provider.getSigner();

  const royalPetsContract = new ethers.Contract(
    config.RoyalPetsContractAddr,
    ROYALPETSABI,
    Signer
  );

  const careTokenContrat = new ethers.Contract(
    config.CareTokenAddr,
    CARETOKENABI,
    Signer
  );

  const mintStateFunc = async () => {
    let balance = 0;
    if (account !== undefined) {
      balance = await royalPetsContract.totalSupply();
      const count = Number(balance.toString());
      setMintCount(count);
      if (count >= config.MaxMintCount) {
        setMintState(false);
      }
    }
  };

  useEffect(() => {
    if (account) {
      mintStateFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const mint = async () => {
    setLoadingState(true);
    if (whiteListState) {
      await careTokenContrat
        .approve(
          config.RoyalPetsContractAddr,
          ethers.utils.parseEther(config.BurnCareAmout.toString()),
          {
            gasLimit: 300000,
          }
        )
        .then((tx) => {
          tx.wait().then(() => {
            royalPetsContract
              .mintWhiteList(config.mintCount, {
                gasLimit: config.totalGas,
                value: ethers.utils.parseEther(config.mintCost.toString()),
              })
              .then((tx) => {
                tx.wait().then(() => {
                  setLoadingState(false);
                  setShowSuccessAlert(true);
                  setTimeout(() => {
                    setShowSuccessAlert(false);
                  }, 4000);
                  window.location.reload();
                });
              });
          });
        });
    } else {
      await careTokenContrat
        .approve(
          config.RoyalPetsContractAddr,
          ethers.utils.parseEther(config.BurnCareAmout.toString()),
          {
            gasLimit: 300000,
          }
        )
        .then((tx) => {
          tx.wait().then(() => {
            royalPetsContract
              .mint(config.mintCost, {
                gasLimit: config.totalGas,
                value: ethers.utils.parseEther(config.mintCost.toString()),
              })
              .then((tx) => {
                tx.wait().then(() => {
                  setLoadingState(false);
                  setShowSuccessAlert(true);
                  setTimeout(() => {
                    setShowSuccessAlert(false);
                  }, 4000);
                  window.location.reload();
                });
              });
          });
        });
    }
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <h1 className="font-bold mt-3 text-4xl text-white">0h : 0m : 0s</h1>
      );
    } else {
      // Render a countdown
      return (
        <h1 className="font-bold mt-3 text-4xl text-white">
          {days}d : {hours}h : {minutes}m : {seconds}s
        </h1>
      );
    }
  };

  const hiddenAlert = () => {};

  return (
    <div className="border-2 lg:px-10 md:px-20 mt-3 px-5 sm:px-10 staking_content staking_content w-full xl:px-60 z-50"></div>
  );
};

export default Staking;
