import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClassicSpinner } from "react-spinners-kit";
import { useWeb3React } from "@web3-react/core";

import STAKINGCONTRACT_ABI from "../../assets/abis/STAKINGCONTRACT_ABI.json";

import NftCard from "./nftcard";
import config from "../../config/config";

const ethers = require("ethers");

export default function Staking() {
  const [preloadState, setPreloadState] = useState(true);
  const [stakedNfts, setStakedNfts] = useState([]);
  const { account } = useWeb3React();

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const StakingContract = new ethers.Contract(
    config.STAKINGCONTRACT_ADDRESS,
    STAKINGCONTRACT_ABI,
    Signer
  );

  const getStakedNfts = async () => {
    let stakedNFTArray = [];
    await StakingContract.getStakedNFTList(account).then(async (data) => {
      // if (data.length > 0) {
      //   setStakedState(true);
      // }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await StakingContract.stakedNFTs(Number(data[i].toString())).then(
          // eslint-disable-next-line no-loop-func
          (stakeInfo) => {
            StakingContract.calculateRewardsNFT(Number(data[i])).then(
              (totalreward) => {
                const unrounded = ethers.utils.formatEther(
                  totalreward.toString()
                );
                const total = parseFloat(unrounded).toFixed(2);
                stakedNFTArray.push({
                  tokenId: Number(data[i]).toString(),
                  balance: total,
                  level: Number(stakeInfo.level).toString(),
                  imgUrl: `${config.IMGIPFS_ADDRESS}/${data[i].toString()}.png`,
                });
              }
            );
          }
        );
      }
    });
    setStakedNfts(stakedNFTArray);
  };

  useEffect(() => {
    if (account) {
      getStakedNfts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  setInterval(() => {
    setPreloadState(false);
  }, 1000);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3, delay: 0.3 }}>
      <div className="2xl:px-32 flex justify-between lg:px-10 mb-10 md:px-20 mt-10 px-5 sm:px-10 w-full z-50">
        <div className="bg-custom-blur border-2 justify-between staking_content w-full">
          <div className="border-b-2 border-custom border-opacity-20 justify-between lg:flex w-full">
            <div className="flex lg:w-auto w-full">
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 rounded-l-full sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Staked Lions
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {stakedNfts.length} Lions
                </h1>
              </div>
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Total Balance
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  15 Lions
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 px-2 py-4 sm:border-r-2 sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Total Balance
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  15 Lions
                </h1>
              </div>{" "}
            </div>
            <div className="border-custom border-t-2 flex lg:border-none">
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 sm:border-l-2 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Avilable for Claim
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  8452 TSP
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 flex justify-center px-6 py-8 sm:border-r-2 text-center w-1/3">
                <button className="bg-white duration-200 hover:bg-green-700 hover:text-white lg:px-10 lg:py-2 px-10 py-2 rounded-full text-xs">
                  Unstake All
                </button>
              </div>{" "}
              <div className="border-custom border-opacity-20 flex justify-center px-6 py-8 sm:border-r-2 text-center w-1/3">
                <button className="bg-white duration-200 hover:bg-green-700 hover:text-white lg:px-10 lg:py-2 px-10 py-2 rounded-full text-xs">
                  Claim All
                </button>
              </div>{" "}
            </div>
          </div>
          {preloadState ? (
            <div className="staking-grid">
              <div className="flex justify-center mt-44 top-10 w-full">
                <ClassicSpinner size={40} />
              </div>
            </div>
          ) : (
            <>
              {stakedNfts.length === 0 ? (
                <div className="staking-grid">
                  <div className="flex justify-center mt-44 top-10 w-full">
                    <h1 className="text-2xl text-gray-500">Nothing to show</h1>
                  </div>
                </div>
              ) : (
                <div className="gap-3 grid grid-cols-1 lg:gap-7 lg:grid-cols-4 md:grid-cols-2 overflow-y-auto p-10 sm:grid-cols-2 staking-grid xl:gap-10 xl:grid-cols-5">
                  {stakedNfts.map((data, index) => (
                    <NftCard
                      stakeState={true}
                      tokenId={data.tokenId}
                      imgUrl={data.imgUrl}
                      balance={data.balance}
                      level={data.level}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
