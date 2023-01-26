import { useEffect, useState } from "react";
import Slider from "./Slider";
import { motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import config from "../../config/config";
import CountUp from "react-countup";

import STAKINGCONTRACT_ABI from "../../assets/abis/STAKINGCONTRACT_ABI.json";
import NFTCONTRACT_ABI from "../../assets/abis/NFTCONTRACT_ABI.json";
import REWARDTOKENCONTRACT_ABI from "../../assets/abis/REWARDTOKENCONTRACT_ABI.json";

const ethers = require("ethers");

export default function DashBoard() {
  const { account } = useWeb3React();

  const [stakedNftArray, setStakedNftArray] = useState(0);
  const [unStakedNftArray, setUnStakedNftArray] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [myBalanceOf, setMyBalanceOf] = useState(0);

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const NFTContract = new ethers.Contract(
    config.NFTCONTRACT_ADDRESS,
    NFTCONTRACT_ABI,
    Signer
  );

  const StakingContract = new ethers.Contract(
    config.STAKINGCONTRACT_ADDRESS,
    STAKINGCONTRACT_ABI,
    Signer
  );

  const RewardContract = new ethers.Contract(
    config.REWARDTOKEN_ADDRESS,
    REWARDTOKENCONTRACT_ABI,
    Signer
  );

  const getMydata = async () => {
    await NFTContract.walletOfOwner(account).then((data) => {
      setUnStakedNftArray(data.length);
    });

    await StakingContract.getStakedNFTList(account).then((data) => {
      setStakedNftArray(data.length);
    });
    await StakingContract.getTotalrewards(account).then((data) => {
      const unrounded = ethers.utils.formatEther(data.toString());
      const total = parseFloat(unrounded).toFixed(2);
      setTotalReward(total);
    });
    await RewardContract.balanceOf(account).then((balance) => {
      const unrounded = ethers.utils.formatEther(balance.toString());
      const myBalance = parseFloat(unrounded).toFixed(4);
      setMyBalanceOf(myBalance);
    });
  };

  useEffect(() => {
    if (account) {
      getMydata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}>
      <div className="2xl:px-20 flex justify-between lg:px-10 mb-10 md:px-20 mt-10 px-5 sm:px-10 w-full z-50">
        <div className="bg-custom-blur border-2 border-custom justify-between staking_content w-full">
          <div className="lg:flex w-full">
            <div className="grid grid-cols-2 lg:w-2/3">
              <div className="border-b-2 border-custom border-r-2 w-full">
                <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                  Hunting
                </h1>
                <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                  <CountUp start={0} end={stakedNftArray} duration={3} /> Lions
                </h1>
              </div>
              <div className="border-b-2 border-custom w-full">
                <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                  At home
                </h1>
                <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                  <CountUp start={0} end={unStakedNftArray} duration={3} />{" "}
                  Lions
                </h1>
              </div>
              <div className="border-b-2 border-custom border-r-2 lg:border-b-0 w-full">
                <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                  My TSP Balance
                </h1>
                <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                  <CountUp
                    start={0}
                    end={myBalanceOf}
                    duration={3}
                    decimals={2}
                  />{" "}
                  TCP
                </h1>
              </div>
              <div className="border-b-2 border-custom lg:border-b-0 w-full">
                <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                  Available for claim
                </h1>
                <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                  <CountUp
                    start={0}
                    end={totalReward}
                    duration={3}
                    decimals={4}
                  />{" "}
                  TCP
                </h1>
              </div>
            </div>
            <div className="border-custom border-l-2 lg:mt-0 lg:w-1/3 mt-10">
              <Slider />
              <div className="mt-10 text-center w-full">
                <h1 className="sm:text-2xl text-white">Total NFTs</h1>
                <h1 className="sm:text-5xl text-gray-500 text-lg">
                  <CountUp
                    start={0}
                    end={stakedNftArray + unStakedNftArray}
                    duration={3}
                  />{" "}
                  NFTs
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
